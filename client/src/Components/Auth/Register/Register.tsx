import style from './Register.module.scss'
import { Button, Input } from '@mui/material'
import { RootState } from '../../../../redux/type/type'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { resetInputRegister, setAuthUser, setInputRegister } from '../../../../redux/slice/Users.slice'

export default function Register() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const inputRegister = useSelector((state: RootState)=> state.users.inputRegister)
    
    const handlerSubmit = async(e) =>{
      e.preventDefault()
      try {
         const responce = await fetch("http://localhost:3000/auth/register",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputRegister),
            credentials: "include",
        });
        const result = await responce.json()
        if(result.err){
          alert(result.err)
        }else{
          if(responce.ok){
            dispatch(setAuthUser({name: result.login,auth: true}))
            dispatch(resetInputRegister())
            navigate('/')
          }
        }
      } catch (error) {
          console.error("ne udalos pokazat", error);
      }
    }

    const registrHandler = (e) => {
      dispatch(setInputRegister({[e.target.name]: e.target.value}))
    }

  return (
    <div className={style.container_registr}>
        <div className={style.title}>
            Зарегестрируйся и погрузись в музыку
        </div>
            <form className={style.form} onSubmit={handlerSubmit}>
                <Input type='text' className={style.input} placeholder='Логин пользователя' name="login" value={inputRegister.login} onChange={registrHandler}/>
                <Input type='email' className={style.input} placeholder='Email пользователя' name="email" value={inputRegister.email} onChange={registrHandler}/>
                <Input type='password' className={style.input} placeholder='Пароль пользователя' name="password" value={inputRegister.password} onChange={registrHandler}/>
                <Input type='password' className={style.input} placeholder='Потверждения пароля' name="checkPassword" value={inputRegister.checkPassword} onChange={registrHandler}/>
                <div className={style.container_button}>
                    <Button type="submit" className={style.button} color="inherit">Зарегестрироваться</Button>
                    <Button className={style.button} color="inherit"><Link className={style.link} to="/auth/login">есть аккаунт ?</Link></Button>
                </div>
            </form>
    </div>
  )
}
