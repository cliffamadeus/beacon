import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import LoginPage from './pages/Auth/LoginPage';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import AlumniDashboard from './pages/Alumni/AlumniDashboard';
import { ROLES } from './utils/constants';
import { ToastContainer } from 'react-toastify';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />
              }
            >
              <Route index element={<AdminDashboard />} />
            </Route>

            {/* Protected alumni routes */}
            <Route
              path="/alumni"
              element={
                <ProtectedRoute allowedRoles={[ROLES.ALUMNI]} />
              }
            >
              <Route index element={<AlumniDashboard />} />
            </Route>

            {/* Default redirect */}
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
    
  );
};

export default App;