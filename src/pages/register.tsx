import { Button, TextField, Box, Typography, Link } from '@mui/material';
import Image from 'next/image';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import moment from 'moment/moment';

// Yup Validation Schema
const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, 'Full Name must be at least 3 characters long')
    .required('Full Name is required'),
  dob: Yup.date()
    .max(moment().toDate(), 'Date of Birth cannot be in the future')
    .required('Date of Birth is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

const RegisterPage: React.FC = () => {
  const initialValues = {
    fullName: '',
    dob: '',
    email: '',
    password: '',
  };

  const handleRegister = async (values: any, { resetForm }: { resetForm: () => void }) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
       alert(data.message); // Show success message or redirect user
        resetForm(); // Reset the form values after successful registration
      } else {
        const errorData = await response.json();
        alert(errorData.message); // Handle error message
      }
    } catch (error) {
      console.error('Error registering:', error); // Handle fetch error
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleRegister} // Call handleRegister on form submission
    >
      {({ handleChange, values, errors, touched, setFieldValue }) => (
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
                  src="/logo.svg"  // Replace with your logo path
                  alt="Bayer Logo"
                  width={100}
                  height={100}
                />
              </Box>

              {/* Register Heading */}
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#2196f3' }}>
                Register
              </Typography>

              {/* Full Name Input */}
              <Field
                as={TextField}
                label="Full Name"
                name="fullName"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={values.fullName}
                onChange={handleChange}
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
              />

              {/* DOB Input */}
              <Field
                as={TextField}
                type="date"
                label="DOB"
                name="dob"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: moment().format('YYYY-MM-DD'), // Set max date to today
                }}
                value={values.dob}
                onChange={(e: any) => setFieldValue('dob', e.target.value)}
                error={touched.dob && Boolean(errors.dob)}
                helperText={touched.dob && errors.dob}
              />

              {/* Email Input */}
              <Field
                as={TextField}
                type="email"
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              {/* Password Input */}
              <Field
                as={TextField}
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              {/* Submit Button */}
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
                Submit
              </Button>

              {/* Login Link */}
              <Link href="/login" sx={{ color: '#2196f3', textDecoration: 'none' }}>
                Already a user? Login here
              </Link>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterPage;
