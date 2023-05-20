"use client"
<<<<<<< HEAD
import {Button,Form,Input,Radio,Alert} from 'antd';
=======
import { Calendar, Alert, Col, Radio, Row, Select, Typography, theme } from 'antd';
const dayjs = require('dayjs');
const es = require('dayjs/locale/es'); 
import dayLocaleData from 'dayjs/plugin/localeData';
dayjs.extend(dayLocaleData);
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getSpeciality } from '@/app/redux/reducer';
>>>>>>> 0ebfe72dd62261760a81626dd0eba6a057dd1c9d
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicos } from '@/app/redux/reducer';
import { use, useEffect, useState } from 'react';
import FormItem from 'antd/es/form/FormItem';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'

<<<<<<< HEAD
export default function UserLogin() {
  const {logStatus,speciality} = useSelector(state => state)
  const [alert,setAlert]= useState(false)
  const [registered,setRegistered] = useState(false)
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter()


    //! logStatus has inside logStatus and userStatus
    //! speciality has inside AllMedicos

  useEffect(()=>{
    axios.get("http://localhost:3001/medics")
    .then((res)=>{
        dispatch(getMedicos(res.data));
    })
},[])

console.log(speciality.AllMedicos);
console.log(logStatus.userStatus);

  const onSubmit = async (values) => {
    const id = logStatus.userStatus.id
    setLoading(true);
    const {first_name,last_name,role,email,password} = values
    
    axios.post("http://localhost:3001/auth/register",{first_name,last_name,role,email,password,id})
    .then((res)=>{
        console.log(res.data);
      if(res.data){
        setRegistered(true);
        setLoading(false);
      } 
    })
    .catch((error)=> {
      console.log(error)
      setRegistered("error")
    }
    )
    

    //! this info must be send to the backend
  }
  const FinishFailed=()=>{
    setAlert(!alert)

  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [alert]);

  if(logStatus){
    return (
        <div className='max-w-[40%] mx-auto bg-white shadow-md rounded-md p-6 mt-20' >
          {<div className={alert ? styles.alert : styles.alert_off} role="alert" onClick={FinishFailed}>
        <p className="font-bold">¡Advertencia!</p>
        <p>Corrija los campos por favor... de click a la alerta para borrarla. </p>
      </div>}   <Form labelCol={{   span: 8, }} wrapperCol={{   span: 10, }} layout="horizontal" onFinish={(values)=>onSubmit(values)}onFinishFailed={FinishFailed} >
            <FormItem name="first_name" label="Nombre" rules={[
                {required:true,
                message:"Por favor ingrese su nombre"
            }
            ]}>
                <Input/>
            </FormItem>
            <FormItem name="last_name" label="Apellido" rules={[
                {required:true,
                message:"Por favor ingrese su apellido"
            }
            ]}>
                <Input/>
            </FormItem>
            <Form.Item name="email" label="Correo electrónico"
            rules={[
              {required:true,
                message:"Por favor ingrese su correo electrónico"
              },
              {
                validator: (_, value) => {
                  return new Promise((resolve, reject) => {
                    if (value && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(value)) {
                      resolve(); // Resuelve la promesa si la contraseña es válida
                    } else {
                      reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                    }
                  });
                },
                message: "El correo no es válido"
              }
            ]}
            hasFeedback>
                <Input 
                type="text"
                name="user"
                placeholder="Correo electronico"
                />
              {/* {errors.user && (<span>{errors.user}</span>)} */}
              </Form.Item>
              <Form.Item name="password" label="Contraseña" 
                rules={[
                  {required:true,
                  message:"Por favor ingrese su contraseña"},
                  {
                    validator: (_, value) => {
                      return new Promise((resolve, reject) => {
                        if (value && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value)) {
                          resolve(); // Resuelve la promesa si la contraseña es válida
                        } else {
                          reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                        }
                      });
                    },
                    message: "La contraseña debe contener 1 mayúscula, 1 minúscula y un número"
                  }
                ]}
                hasFeedback
              >
                  <Input.Password
                    
                    name="password"
                    placeholder="Contraseña"/>
              </Form.Item>
    
    
              <Form.Item name="ConfirmedPassword" label="Confirmar contraseña"
              dependencies={["password"]} 
                rules={[
                  {required:true,
                  message:"Por favor ingrese su contraseña"},
                  ({getFieldValue})=>({
                    validator(_,value){
                        if(!value || getFieldValue("password") === value){
                            return Promise.resolve()
                        }
                        return Promise.reject("Las contraseñas no coinciden")
                  }})
                ]}
                hasFeedback
              >
                  <Input.Password
                    
                    name="ConfirmedPassword"
                    placeholder="Confirmar contraseña"/>
              </Form.Item>
              {/* {errors.password && (<span>{errors.password}</span>)} */}
              {registered === "error" ? <Alert
              message="Ocurrió un error al registrarse"
              type="warning"
    /> : !registered && <Button block htmlType='submit' loading={loading}>registrarse</Button>}
            </Form>
        </div>
      );
    }else{
      return(
        <div>
            <h1>Debe iniciar sesión para pedir un turno</h1>
            {setTimeout(() => {
                router.push("/components/forms/UserLogin")
            }, 2000)}
        </div>
    )
  }

  
}
=======
const Turnos = () => {
  // let day = date["$d"].getDay()
  dayjs.locale(es);
  const today = dayjs()
  const actualMonth = dayjs().month()
  const [value, setValue] = useState();
  const [selectedValue, setSelectedValue] = useState();
    const dispatch = useDispatch()
    const {AllSpecial} = useSelector(state => state.speciality)
    let check = false
    const { token } = theme.useToken();
    const specialityDay = [];

const randomDay = () => {
  const randomIndex = Math.floor(Math.random() * 7);
  return randomIndex;
};

const añadirDia = async () => {
  const response = await axios.get("http://localhost:3001/specializations");
  const test = response?.data.map((obj) => {
    const selectedDay = randomDay();
    return { ...obj, selectedDay };
  });
  dispatch(getSpeciality(test));
};

const auxFunc = () => {
  const updatedSpecialityDay = AllSpecial.map((obj) => {
    return { [obj.selectedDay]: obj.name };
  });
  specialityDay.splice(0, specialityDay.length, ...updatedSpecialityDay);
};

useEffect(() => {
  if (!AllSpecial.length) {
    añadirDia();
  }
}, [AllSpecial]);

useEffect(() => {
  auxFunc();
}, [AllSpecial]);

console.log(specialityDay);

          const onSelect = (newValue) => {
            setValue(newValue);
            setSelectedValue(newValue);
          };
          
          const onPanelChange = (newValue) => {
            setValue(newValue);
            console.log("new value",newValue);
            console.log(newValue.format('DD-MM-YYYY'));
          };
          
          const disabledDate = async (current) => {
          // Deshabilitar las fechas anteriores al día de hoy
          if(specialityDay.length){
            console.log(await specialityDay?.filter((obj) => obj))
            if (!current.isBefore(today.startOf('day')) || !specialityDay.filter((obj) => Object.keys(obj).includes(current.day()))) {
              return false;
            }return true;
          }
        };
  
      

        const wrapperStyle = {
          width: 300,
          border: `1px solid ${token.colorBorderSecondary}`,
          borderRadius: token.borderRadiusLG,
        };
        
        return (
          <>
        {/* <Alert message={`Seleccionaste la fecha: ${selectedValue?.format('DD-MM-YYYY')}`} /> */}
        <div style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i).locale(es);
            months.push(localeData.monthsShort(current));
          }
          for (let i = start; i < end; i++) {
            if (i >= actualMonth) {
              monthOptions.push(
                <Select.Option key={i} value={i} className="month-item">
                  {months[i]}
                </Select.Option>,
              );
            }
          }

          const month = value.month();      
          return (
            <div
              style={{
                padding: 8,
              }}
            >
              <Typography.Title level={4}>Custom header</Typography.Title>
              <Row gutter={8}>
                <Col>
                  <p>Mes</p>
                </Col>
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
        disabledDate={disabledDate}
        onChange={onPanelChange}
      />
    </div>
      </>
    );
  };
  
  export default Turnos;
>>>>>>> 0ebfe72dd62261760a81626dd0eba6a057dd1c9d
