import { Button, TextField, Box, Typography, Link, Backdrop, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useState } from 'react'; // Import useState for managing loading state

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State for loading

  // Initial form values
  const initialValues = { email: '', password: '' };

  // Handle form submission
  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true); // Set loading to true when starting login

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message ? `${data.message}` : 'Error occurred');
        throw new Error('Login failed');
      }

      
      const { token } = data;

      // Save the token in local storage
      localStorage.setItem('token', token);
      alert(data.message ? `(${data.type}) ${data.message}  - JWT: ${data.token}` : 'Error occurred');

      // Redirect the user after successful login
      router.push('/patientDashboard');
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setLoading(false); // Set loading to false after the login attempt
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, values, errors, touched }) => (
          <Form>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
              }}
            >
              <Box
                sx={{
                  width: 400,
                  p: 4,
                  backgroundColor: 'white',
                  boxShadow: 3,
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              >
                {/* Bayer Logo */}
                <Box sx={{ mb: 2 }}>
                  <Image
                    src="/logo.svg" // Replace with your logo path
                    alt="Bayer Logo"
                    width={100}
                    height={100}
                  />
                </Box>

                {/* Login Heading */}
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#2196f3' }}>
                  Login
                </Typography>

                {/* Email Input */}
                <Field
                  as={TextField}
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email ? errors.email : ''}
                />

                {/* Password Input */}
                <Field
                  as={TextField}
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  sx={{ mb: 2 }}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password ? errors.password : ''}
                />

                {/* Login Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    mb: 2,
                    '&:hover': { backgroundColor: '#388e3c' },
                  }}
                >
                  Login
                </Button>

                {/* Links for Forgot Password and Register */}
                <Link href="#" sx={{ display: 'block', mb: 1, color: '#2196f3', textDecoration: 'none' }}>
                  Forgot Password?
                </Link>
                <Link href="/register" sx={{ color: '#2196f3', textDecoration: 'none' }}>
                  New User? Register here
                </Link>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Backdrop for loading indication */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default LoginPage;
