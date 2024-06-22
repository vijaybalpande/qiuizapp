import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .required("Email is required")
      .matches(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email ID"),

    password: Yup.string()
      .trim()
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password needs uppercase, special character, and digit."
      ),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      const storedUserData = localStorage.getItem("user");
      const storedUser = storedUserData ? JSON.parse(storedUserData) : null;

      if (storedUser && storedUser.email === values.email && storedUser.password === values.password) {
        localStorage.setItem("loggedin", true);
        navigate("/");
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setLoginError("An error occurred during login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          validateForm,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form
            onSubmit={async (event) => {
              event.preventDefault();
              await validateForm();
              handleLogin(values, { setSubmitting: () => {} });
            }}
          >
            <div className="form-group register-form">
              <h2>Login</h2>

              <Form.Group controlId="email" className="form-group">
                <Form.Label className="required-field">Email</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="false"
                  placeholder="Please enter email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={Boolean(errors.email) && touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password" className="form-group">
                <Form.Label className="required-field">Password</Form.Label>
                <div className="field-has-icon">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    autoComplete="false"
                    placeholder="Please enter password"
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.password) && touched.password}
                  />
                  <Button
                    variant="transparent"
                    className="field-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </div>
              </Form.Group>

              {loginError && (
                <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>
                  {loginError}
                </div>
              )}

              <div className="btn-wrap">
                <Button
                  variant="primary"
                  type="submit"
                  size="md"
                  className="w-100 shadow"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? "Login" : "Submitting..."}
                </Button>
                <p className="text-center text-muted mt-3 mb-0">
                  Don't Have An Account?
                  <Link to="/Register" className="fw-bold text-body">
                    <u>Register</u>
                  </Link>
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
