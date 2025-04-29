import { Container, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome, {user?.email}! You have admin privileges.
      </Typography>
      {/* Admin-specific content will go here */}
    </Container>
  );
};

export default AdminDashboard;