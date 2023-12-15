import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import style from "./Header.module.scss"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../../../redux/slice/Users.slice';
import { useEffect } from 'react';
import { RootState } from '../../../redux/type/type';


export default function Header() {

  const dispatch = useDispatch()

  const userAuth = useSelector((state: RootState)=> state.users.authUser)
  console.log("🚀 ~ file: Header.tsx:19 ~ Header ~ userAuth:", userAuth)

const authUserCheсk = async() =>{
    try {
       const responce = await fetch("http://localhost:3000/auth",{
          credentials: "include",
      });
      const result = await responce.json()
      console.log("🚀 ~ file: Header.tsx:22 ~ authUserChek ~ result:", result)
      dispatch(setAuthUser({name: result.login, auth: true}))
  } catch (error) {
      console.error("ne udalos pokazat", error);   
  } 
  }
  
  const handlerLogout = async() =>{
    try {
      const responce = await fetch("http://localhost:3000/auth/logout",{
         credentials: "include",
     });
     const result = await responce.json()
     dispatch(setAuthUser({name: result.login, auth: false}))
 } catch (error) {
     console.error("ne udalos pokazat", error);   
 } 
  }

  useEffect(()=>{
    authUserCheсk()
  },[])

  return (
    <Box className={style.container} sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{backgroundColor: "rgb(20, 20, 20)"}}>
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
            </Typography>
            <div className={style.container_button}>
              {userAuth.auth ? <div style={{display: "flex", alignItems: "center", gap: "2rem"}}>
              <div>hello {userAuth.name}</div>
              <Button onClick={handlerLogout} className={style.button} color="inherit">Выйти</Button>
              </div>
              :
                <><Link to="/auth/register"> <Button className={style.button} color="inherit">Зарегестрироваться</Button></Link>
                <Link to="/auth/login"><Button className={style.button} color="inherit">Войти</Button></Link></>
              }
            </div>
        </Toolbar>
        </AppBar>
    </Box>
  )
}
