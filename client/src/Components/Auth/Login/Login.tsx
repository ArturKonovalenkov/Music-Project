import style from '../Register/Register.module.css'
import { Button, Input } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../../../redux/type/type'
import { setInput } from '../../../../redux/slice/Users.slice'

export default function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const input = useSelector((state: RootState)=> state.users.inputs)
  console.log("🚀 ~ file: Login.tsx:13 ~ Login ~ input:", input)
  


  const handlerSubmit = async(e) =>{
    e.preventDefault()
    try {
        await fetch("http://localhost:3000/auth/login",{
          method: "POST",
          headers:{
              "Content-Type": "application/json"
          },
          body: JSON.stringify(input),
          credentials: "include",
      });
      navigate('/')
  } catch (error) {
      console.error("ne udalos pokazat", error);
      
  }
    
  }
  const loginHandler = (e) => {
    dispatch(setInput({[e.target.name]: e.target.value}))
}

  return (
    <div className={style.container_registr}>
        <div className={style.title}>
            Зарегестрируйся и погрузись в музыку
        </div>
            <form className={style.form} onSubmit={handlerSubmit}>
                <Input className={style.input} placeholder='Email пользователя' name="email" value={input.email} onChange={loginHandler}/>
                <Input className={style.input} placeholder='Пароль пользователя' name="password" value={input.password} onChange={loginHandler}/>
                <div className={style.container_button}>
                    <Button type="submit" className={style.button} color="inherit">Войти</Button>
                    <Button className={style.button} color="inherit"><Link className={style.link} to="/register">нету аккаунта ?</Link></Button>
                </div>
            </form>
    </div>
  )
}
