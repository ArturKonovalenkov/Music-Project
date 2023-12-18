import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import style from "./Header.module.scss"
import { Link, useNavigate,Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../../redux/type/type';
import { logoutUser, userAuthCheck } from '../../../redux/Thunk/Users.Thunk';


export default function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userAuth = useSelector((state: RootState)=> state.users.authUser)
  console.log("🚀 ~ file: Header.tsx:21 ~ Header ~ userAuth:", userAuth)

  useEffect(()=>{
    dispatch(userAuthCheck())
  },[])

  return (
    <><Box className={style.container} sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "rgb(20, 20, 20)" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <div className={style.container_button}>
            {userAuth.name ? <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <div>hello {userAuth.name}</div>
              <Button onClick={() => { dispatch(logoutUser()), navigate("/auth/login"); } } className={style.button} color="inherit">Выйти</Button>
            </div>
              :
              <><Link to="/auth/register"> <Button className={style.button} color="inherit">Зарегестрироваться</Button></Link>
                <Link to="/auth/login"><Button className={style.button} color="inherit">Войти</Button></Link></>}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet />
    </>
  )
}
