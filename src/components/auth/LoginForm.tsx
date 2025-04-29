import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import RoleSelector from './RoleSelector';
import { ROUTES } from '../../utils/constants';
import { AuthUser } from '../../types/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginFormProps {
  onLogin: (email: string, password: string, role: string) => Promise<AuthUser | null>;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('alumni');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // ✅ Basic validation
    if (!email || !password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    try {
      const user = await onLogin(email, password, role);
      if (user) {
        toast.success(`Welcome, ${user.role === 'admin' ? 'Admin' : 'Alumni'}!`);
        navigate(user.role === 'admin' ? ROUTES.ADMIN : ROUTES.ALUMNI);
      } else {
        setError('Invalid login credentials or role mismatch');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <RoleSelector role={role} setRole={setRole} />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </Box>
  );
};

export default LoginForm;
