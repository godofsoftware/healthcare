## Tech used
Next.js 14.2.16 
node 20.18.0
npm 10.9.0
JWT for security
Custom AuthProvider

## security headers

X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, Referrer-Policy, Permissions-Policy

CSP is commented for dev purpose

all security headers are handled properly in next.config.mjs

## JWT

For JWT used npm jsonwebtoken

## Auth Provider

1.The custom AuthProvider manages authentication state and provides methods to log in and log out.
2.It verifies the JWT on mount and keeps track of the user's authentication status.
3.You can access authentication state and methods in any component using the useAuth hook.

## Theme

Used MUI theme

## Visitor page

Designed with responsive nav reusable component

## login page

Imports:

Uses components from Material-UI such as Button, TextField, and Box for building the UI.
Integrates Formik for form management and Yup for validation schemas.
Uses Next.js router for navigation after successful login.
Validation Schema:

A Yup schema is defined to validate the email and password fields. The email must be a valid format, and both fields are required.
Component State:

Uses useState to manage a loading state while the login request is being processed.
Initial Values:

Sets initial form values for email and password as empty strings.
Handle Login Function:

On form submission, it sends a POST request to the /api/login endpoint with the email and password.
If the response is successful, it saves the JWT token in localStorage (ensuring the code only runs in the browser).
Alerts the user of the login status and navigates to the /patientDashboard page upon success.
Form Layout:

Uses Formik's <Field> component to create input fields for email and password, with error handling and display of validation messages.
Includes a Bayer Logo, a heading for the login form, and links for forgotten passwords and new user registration.
Loading Indication:

Displays a backdrop with a loading spinner when a login request is in progress.
Return Statement:

Renders the Formik form within a styled Box component that centers it in the viewport.

## Register page

Imports:

Utilizes Material-UI components like Button, TextField, and Box for building the user interface.
Integrates Formik for form handling and Yup for validation schemas.
Uses moment for date manipulation.
Validation Schema:

A Yup validation schema is defined to ensure:
Full Name: At least 3 characters and is required.
Date of Birth (DOB): Must be a valid date, cannot be in the future, and is required.
Email: Must be in a valid format and is required.
Password: Must be at least 8 characters long and is required.
Initial Values:

Defines initial form values for fullName, dob, email, and password as empty strings.
Handle Registration Function:

On form submission, it sends a POST request to the /api/register endpoint with the form data.
If successful, it alerts the user with a success message and resets the form.
If there is an error, it alerts the user with the error message.
Form Layout:

Uses Formik's <Field> component to create input fields for Full Name, DOB, Email, and Password, with error handling and validation messages.
Displays the Bayer logo, a registration heading, and a submit button.
DOB Input:

The DOB field uses the type date, and it restricts the maximum date to today using the moment library.
Submit Button:

Styled using Material-UI with hover effects.
Login Link:

Provides a link for existing users to navigate to the login page.

## Validation

used YUP validation schemas

## Getting Started

First, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.