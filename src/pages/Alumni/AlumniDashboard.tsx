import { Container, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const AlumniDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Alumni Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome back, {user?.email}!
      </Typography>
      {/* Alumni-specific content will go here */}
    </Container>
  );
};

export default AlumniDashboard;