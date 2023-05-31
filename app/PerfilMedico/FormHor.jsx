import {Button,Form,Input,Radio,Alert, Select, TimePicker} from 'antd';
import style from "./Forms.module.css"
import FormItem from 'antd/es/form/FormItem';
import axios from "axios"
const format = 'HH:mm'
const localHorario = 'http://localhost:3001/schedule/create'

export default function FormHor({filtromedico, setSuccess,setError,success,error}) {

const diasSemana = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

const [form] = Form.useForm();
const onSubmit = async (fieldsValue) => {
const values = {
  'start_time': fieldsValue['start_time'].format('HH:mm'),
  'end_time': fieldsValue['end_time'].format('HH:mm'),
  'day_of_week' : fieldsValue['day_of_week'],
  'medicoId': filtromedico[0].id
}
axios.post(localHorario, values)
.then(() => {
  // Código para manejar la respuesta en caso de éxito
  setSuccess({ ...success, alert: true });
  console.log("Antes de resetFields");
        form.resetFields();
        console.log("Después de resetFields");
})
.catch(() => {
  // Código para manejar la respuesta en caso de error
  setError({ ...error, alert: true });
});

}



  return (
    <div className={style.container  + " top-1/3 "} >
          <h1 className={style.title}>Horario de Atencion</h1>
          <Form labelCol={{   span: 0, }} wrapperCol={{   span: 14, }} layout="horizontal" onFinish={(values)=>onSubmit(values)} >
          
            <FormItem name="start_time" label="Inicio de Turno">
            
            <TimePicker format={format} />
            </FormItem>
            <FormItem name="end_time" label="Fin de Turno">
            
            <TimePicker format={format} />
            </FormItem>
            <FormItem name="day_of_week" label="Fecha" >
                <Select showSearch optionFilterProp='children'>
                {diasSemana.map((e, index)=>{
                return (
                  <Option key={index} value={index}>{e}</Option>
                )
              })}

                </Select>
            </FormItem>
            
              
    
            <Button  htmlType='submit' className={style.Button}>Enviar</Button>
            
            </Form>
        </div>
  )
}