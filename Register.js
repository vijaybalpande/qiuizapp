import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      localStorage.setItem("user", JSON.stringify(values));
      navigate("/Login");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          validateForm,
          values,
          errors,
          isValid,
          touched,
          submitCount,
          isSubmitting,
        }) => (
 

          <Form
            onSubmit={async (event) => {
              event.preventDefault();
              await validateForm();
              handleSubmit(event);
            }}
          >
            <div className="form-group register-form">
              <h2>Register</h2>

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
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                    />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </div>
              </Form.Group>

              <div className="btn-wrap">
                <Button
                  variant="primary"
                  type="submit"
                  size="md"
                  className="w-100 shadow"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? "Register" : "Submitting..."}
                </Button>
                <p className="text-center text-muted mt-3 mb-0">
                  Already Registered?
                  <Link to="/Login" className="fw-bold text-body">
                    <u>Login</u>
                  </Link>{" "}
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
