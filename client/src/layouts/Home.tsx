import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import useAuth from '../hooks/useAuth';
import useAuthenticate from '../hooks/useAuthenticate';

const Title = styled(Typography)(
  ({ theme }) => `
    color: white;
    text-align: center;
`
);

export default function Home() {
  const { isAuth } = useAuth();
  const { token, auth } = useAuthenticate();
  const [logged, setLogged] = useState<boolean>(false);

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
    <>
      {!logged && <Title variant="h1">
        Welcome!!!
      </Title>}
      {logged && <Title variant="h1">
        Hey, {auth.name}!!!
      </Title>}
    </>
  );
}
