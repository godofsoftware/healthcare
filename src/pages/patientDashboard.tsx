import { Box, Typography, Button } from '@mui/material';
import { AuthProvider, useAuth } from '../context/AuthContext'; // Import AuthProvider and useAuth
import { useRouter } from 'next/router';

const PatientDashboardContent: React.FC = () => {
  
  // const { isAuthenticated, logout } = useAuth();
  // const router = useRouter();

  // const handleLogout = () => {
  //   logout();
  //   router.push('/login');
  // };

  // if (!isAuthenticated) {
  //   return (
  //     <Box sx={{ textAlign: 'center', mt: 5 }}>
  //       <Typography variant="h5">You are not logged in. Please log in first.</Typography>
  //     </Box>
  //   );
  // }

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4">Welcome to the Patient Dashboard!</Typography>
      {/* <Button variant="contained" onClick={handleLogout} sx={{ mt: 3 }}>
        Logout
      </Button> */}
    </Box>
  );
};

// // Wrap the main component with AuthProvider
// const PatientDashboard: React.FC = () => (
//   <AuthProvider>
//     <PatientDashboardContent />
//   </AuthProvider>
// );

export default PatientDashboardContent;
