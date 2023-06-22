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
  TextField
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

function Register() {
  const { googleAuth, register, isAuth } = useAuth();
  const { token } = useAuthenticate();
  const navigate = useNavigate();

  useEffect(() => {
    isAuth().then((res) => {
      if (res) navigate("/");
    });
  }, [token]);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = () => {
    const data = { name, email, password, confirmPassword };
    register(data);
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
                Sign Up with Google Account
              </Button>
              <Divider sx={{ mt: 4 }}>OR</Divider>
              <FormControl margin="normal" variant="outlined" fullWidth onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}>
                <TextField margin="normal" label="Name" value={name} onChange={e => setName(e.target.value)} />
                <TextField margin="normal" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <TextField margin="normal" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <TextField margin="normal" label="ConfirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </FormControl>
              <Button type="submit" variant="outlined" onClick={handleSubmit}>
                Sign Up
              </Button>
              <Link to="/"><Button sx={{marginLeft: "50px"}} variant="outlined">Cancel</Button></Link>
              <Divider sx={{ m: 2 }} />
              Already have an account? <Link to="/login">Sign In</Link>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Register;
