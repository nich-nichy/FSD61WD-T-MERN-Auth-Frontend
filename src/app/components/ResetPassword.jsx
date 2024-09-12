import React from 'react';
import { Formik } from 'formik';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const url = import.meta.env.VITE_APP_URL;

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 position-relative">
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <h1 className="text-center mb-1">Reset Password</h1>
                    <p className='text-center mb-4'>Please insert your new password here</p>
                    <Formik
                        initialValues={{ password: '', confirmPassword: '' }}
                        validate={values => {
                            const errors = {};
                            const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
                            if (!values.password) {
                                errors.password = 'Password is required';
                            } else if (!passwordRegex.test(values.password)) {
                                errors.password = 'Password must be at least 6 characters, include at least one special character and one number';
                            }
                            if (!values.confirmPassword) {
                                errors.confirmPassword = 'Confirm password is required';
                            } else if (values.password !== values.confirmPassword) {
                                errors.message = "Passwords do not match";
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            try {
                                const { data } = await axios.post(
                                    `${url}/reset-password/${token}`,
                                    { newPassword: values.confirmPassword },
                                    { withCredentials: true }
                                );
                                const { success, message } = data;
                                if (success) {
                                    Swal.fire({
                                        title: "Good Job!",
                                        text: message,
                                        icon: "success"
                                    });
                                    setTimeout(() => {
                                        navigate("/login");
                                    }, 1000);
                                }
                            } catch (error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: error.response?.data?.message || "Something went wrong"
                                });
                            } finally {
                                setSubmitting(false);
                                resetForm();
                            }
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <Form onSubmit={handleSubmit} className="bg-light p-4 rounded w-100" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        isInvalid={touched.password && !!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Re-enter your password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {errors.message && <div className="text-danger mt-2">{errors.message}</div>}
                                <Button
                                    className="w-100 mt-4 submit-btn"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <div className="mt-3">
                        <p className='text-center'>Remembered the password? Return to <a className="text-decoration-none primary" href="/login">Login</a></p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ResetPassword;
