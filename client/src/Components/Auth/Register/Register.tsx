import style from './Register.module.css'
import { Button, Input } from '@mui/material'
import { RootState } from '../../../../redux/type/type'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { resetInput, setInput } from '../../../../redux/slice/Users.slice'


export default function Register() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

    const input = useSelector((state: RootState)=> state.users.inputs)
    console.log("🚀 ~ file: Register.tsx:10 ~ Register ~ input:", input)

    const handlerSubmit = async(e) =>{
      e.preventDefault()
      try {
          await fetch("http://localhost:3000/auth/register",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input),
            credentials: "include",
        });
        dispatch(resetInput())
        navigate('/')
    } catch (error) {
        console.error("ne udalos pokazat", error);
        
    }
      
    }

    const registrHandler = (e) => {
      dispatch(setInput({[e.target.name]: e.target.value}))
  }

  return (
    <div className={style.container_registr}>
        <div className={style.title}>
            Зарегестрируйся и погрузись в музыку
        </div>
            <form className={style.form} onSubmit={handlerSubmit}>
                <Input className={style.input} placeholder='Логин пользователя' name="login" value={input.login} onChange={registrHandler}/>
                <Input className={style.input} placeholder='Email пользователя' name="email" value={input.email} onChange={registrHandler}/>
                <Input className={style.input} placeholder='Пароль пользователя' name="password" value={input.password} onChange={registrHandler}/>
                <Input className={style.input} placeholder='Потверждения пароля' name="checkPassword" value={input.checkPassword} onChange={registrHandler}/>
                <div className={style.container_button}>
                    <Button type="submit" className={style.button} color="inherit">Зарегестрироваться</Button>
                    <Button className={style.button} color="inherit"><Link className={style.link} to="/login">есть аккаунт ?</Link></Button>
                </div>
            </form>
    </div>
  )
}
