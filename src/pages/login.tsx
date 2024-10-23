import { Button, TextField, Box, Typography, Link, Backdrop, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'; // Import useEffect for testing localStorage

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
      const response = await fetch('http://139.59.95.155/webapi/auth/signin', {
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

      const { accessToken } = data;

      // Save the token in local storage only if we are in the browser
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', accessToken);
      }

      alert(data.accessToken ? `(${data.role}) 'Logged in Success' - JWT: ${accessToken}` : 'Failed');
      // Redirect the user after successful login
      router.push('/patientDashboard');
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setLoading(false); // Set loading to false after the login attempt
    }
  };

  // Testing localStorage
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     localStorage.setItem('testKey', 'testValue');
  //     console.log(localStorage.getItem('testKey')); // Should output 'testValue'
  //   }
  // }, []);

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
