import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  styled,
  TextField,
} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAuthenticate from "../../hooks/useAuthenticate";

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function Login() {
  const { googleAuth, login, isAuth } = useAuth();
  const { token } = useAuthenticate();
  const navigate = useNavigate();

  useEffect(() => {
    isAuth().then((res) => {
      if (res) navigate('/');
    });
  }, [token]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    login(email, password);
  }

  return (
    <>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h2" sx={{ my: 2 }}>
              Welcome!
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              <Button variant="outlined" onClick={() => googleAuth()}>
                Sign In with Google Account
              </Button>
              <Divider sx={{ mt: 4 }}>OR</Divider>
              <FormControl margin="normal" variant="outlined" fullWidth onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}>
                <TextField margin="normal" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <TextField margin="normal" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <Link to="/register">
                  Forgot Password?
                </Link>
                <Button type="submit" variant="outlined" onClick={handleSubmit}>
                  Sign In
                </Button>
                <Link to="/"><Button variant="outlined">Cancel</Button></Link>
              </Box>
              <Divider sx={{ m: 2 }} />
              Don't have an account? <Link to="/register">Sign Up</Link>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Login;
