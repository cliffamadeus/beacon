export const ROLES = {
    ADMIN: 'admin',
    ALUMNI: 'alumni',
  } as const;
  
  export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  
  export const ROUTES = {
    LOGIN: '/login',
    ADMIN: '/admin',
    ALUMNI: '/alumni',
  };