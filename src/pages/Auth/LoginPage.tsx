import { Container, Paper, Typography } from '@mui/material';
import LoginForm from '../../components/auth/LoginForm';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Alumni Portal
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Please sign in to continue
        </Typography>
        <LoginForm onLogin={login} />
      </Paper>
    </Container>
  );
};

export default LoginPage;