import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAuth from '../../hooks/useAuth';
import useAuthenticate from '../../hooks/useAuthenticate';

import logo from "../../assets/images/logo.svg";

const Container = styled(AppBar)(
  ({ theme }) => `
    height: 90px;
    background-color: transparent;
    justify-content: center;
    border-bottom: 1px solid white;
`
);

export default function Header() {
  const { logout, isAuth, message} = useAuth();
  const { token } = useAuthenticate();
  const [logged, setLogged] = useState<boolean>(false);
  
  useEffect(() => {
    if(message !== ""){toast(message);}
  },[message]);

  useEffect(() => {
    isAuth().then((res) => {
      if (res) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  }, [token]);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} />
          </Typography>
          {!logged && <Link to="/login"><Button sx={{ fontSize: "20px" }} color="inherit">Sign In</Button></Link>}
          {logged && <Button sx={{ fontSize: "20px" }} color="inherit" onClick={() => logout()}>Sign Out</Button>}
        </Toolbar>
      </Container>
      <ToastContainer />
    </Box>
  );
}
