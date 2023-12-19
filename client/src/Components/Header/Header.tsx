import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import style from "./Header.module.scss"
import { Link, useNavigate,Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../../redux/type/type';
import { logoutUser, userAuthCheck } from '../../../redux/Thunk/Users.Thunk';
import { Avatar, IconButton, MenuItem, Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { setVisiblePlayBar } from '../../../redux/slice/Tracks.slice';
import { audio } from '../../function/function';

const settings = [{id:1,value:<Link className={style.link} to="#">Профиль</Link>},{id:2,value:<Link className={style.link} to="#">Избранные</Link>}];

export default function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userAuth = useSelector((state: RootState)=> state.users.authUser)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handlerLogout=()=>{
    dispatch(logoutUser())
    navigate("/auth/login")
    dispatch(setVisiblePlayBar(false))
    audio.pause()
  }

  useEffect(()=>{
    dispatch(userAuthCheck())
  },[])

  return (
    <><Box className={style.container} sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "rgb(20, 20, 20)" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Music
          </Typography>
          <div className={style.container_button}>
            {userAuth.name ? <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <Tooltip  title="Open settings">
              <IconButton  onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar className={style.avatar} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.value}</Typography>
                </MenuItem>
              ))}
            </Menu>
              
              <Button onClick={handlerLogout} className={style.button} color="inherit">Выйти</Button>
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
