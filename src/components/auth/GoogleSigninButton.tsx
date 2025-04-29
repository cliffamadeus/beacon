import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { supabase } from '../../api/supabase';

const GoogleSignInButton = () => {
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={handleGoogleSignIn}
      sx={{ mt: 2 }}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;