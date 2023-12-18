import style from '../Register/Register.module.scss'
import { Button, Input } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../../../redux/type/type'
import { setInputLogin,resetInputLogin, setAuthUser } from '../../../../redux/slice/Users.slice'


export default function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputLogin = useSelector((state: RootState)=> state.users.inputLogin)

  const handlerSubmit = async(e) =>{
    e.preventDefault()
    try {
      const responce =await fetch("http://localhost:3000/auth/login",{
          method: "POST",
          headers:{
              "Content-Type": "application/json"
          },
          body: JSON.stringify(inputLogin),
          credentials: "include",
        });
        const result = await responce.json()
        if(result.err){
          alert(result.err)
        }else{
          if(responce.ok){
            dispatch(setAuthUser({name: result.login,auth: true}))
            dispatch(resetInputLogin())
            navigate('/')
          }
        }
      } catch (error) {
          console.error("ne udalos pokazat", error);  
      }
  }

  const loginHandler = (e) => {
    dispatch(setInputLogin({[e.target.name]: e.target.value}))
  }

  return (
    <div className={style.container_registr}>
        <div className={style.title}>
            Авторизируйся и погрузись в музыку
        </div>
            <form className={style.form} onSubmit={handlerSubmit}>
                <Input type='email' className={style.input} placeholder='Email пользователя' name="email" value={inputLogin.email} onChange={loginHandler}/>
                <Input type='password' className={style.input} placeholder='Пароль пользователя' name="password" value={inputLogin.password} onChange={loginHandler}/>
                <div className={style.container_button}>
                    <Button type="submit" className={style.button} color="inherit">Войти</Button>
                    <Button className={style.button} color="inherit"><Link className={style.link} to="/auth/register">нету аккаунта ?</Link></Button>
                </div>
            </form>
    </div>
  )
}
