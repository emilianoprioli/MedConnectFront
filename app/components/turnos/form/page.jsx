"use client";
import { Button, Form, Input, Radio, Alert } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMedicos } from "@/app/redux/reducer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const medicsURL = `${backendURL}/medics`;

// export default function UserLogin() {
//   <h1>Dummy</h1>;
// }
export default function UserLogin() {
  const speciality = useSelector((state) => state.speciality);
  const logStatus = useSelector((state) => state.logStatus);

  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  //! logStatus has inside logStatus and userStatus
  //! speciality has inside AllMedicos
  useEffect(() => {
    axios.get(medicsURL).then((res) => {
      dispatch(getMedicos(res.data));
    });
  }, []);
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push("/components/forms/UserLogin");
    }, 2000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []);

  console.log(speciality.AllMedicos);
  console.log(logStatus.userStatus);

  const onSubmit = async (values) => {
    const id = logStatus.userStatus.id;
    setLoading(true);
    const { first_name, last_name, role, email, password } = values;
    console.log({ first_name, last_name, role, email, password });
    axios
      .post(`${backendURL}/auth/register`, {
        first_name,
        last_name,
        role,
        email,
        password,
        id,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setRegistered(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setRegistered("error");
      });

    //! this info must be send to the backend
  };
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push("/components/forms/UserLogin");
    }, 2000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []);

  if (logStatus.userStatus) {
    return (
      <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={(values) => onSubmit(values)}
        >
          <Form.Item
            name="first_name"
            label="Nombre"
            rules={[{ required: true, message: "Por favor ingrese su nombre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Apellido"
            rules={[
              { required: true, message: "Por favor ingrese su apellido" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Correo electrónico"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su correo electrónico",
              },
              {
                validator: (_, value) => {
                  return new Promise((resolve, reject) => {
                    if (
                      value &&
                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(value)
                    ) {
                      resolve(); // Resolves the promise if the email is valid
                    } else {
                      reject("El correo no es válido"); // Rejects the promise with the error message
                    }
                  });
                },
              },
            ]}
            hasFeedback
          >
            <Input type="text" name="user" placeholder="Correo electronico" />
            {/* {errors.user && (<span>{errors.user}</span>)} */}
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: "Por favor ingrese su contraseña" },
              {
                validator: (_, value) => {
                  return new Promise((resolve, reject) => {
                    if (
                      value &&
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value)
                    ) {
                      resolve(); // Resuelve la promesa si la contraseña es válida
                    } else {
                      reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                    }
                  });
                },
                message:
                  "La contraseña debe contener 1 mayúscula, 1 minúscula y un número",
              },
            ]}
            hasFeedback
          >
            <Input.Password name="password" placeholder="Contraseña" />
          </Form.Item>

          <Form.Item
            name="ConfirmedPassword"
            label="Confirmar contraseña"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Por favor ingrese su contraseña" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Las contraseñas no coinciden");
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              name="ConfirmedPassword"
              placeholder="Confirmar contraseña"
            />
          </Form.Item>
          {/* {errors.password && (<span>{errors.password}</span>)} */}
          {registered === "error" ? (
            <Alert message="Ocurrió un error al registrarse" type="warning" />
          ) : (
            !registered && (
              <Button block htmlType="submit" loading={loading}>
                registrarse
              </Button>
            )
          )}
        </Form>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Debe iniciar sesión para pedir un turno</h1>
      </div>
    );
  }
}
