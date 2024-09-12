import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const RequestPassword = () => {
    const navigate = useNavigate();
    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 position-relative">
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <h1 className="text-center mb-1">Reset Password</h1>
                    <p className='text-center mb-4'>Please insert your email here</p>
                    <Formik
                        initialValues={{ email: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            try {
                                Swal.fire({
                                    title: "Password reset!",
                                    text: "request has been initiated!",
                                    icon: "success"
                                });
                                try {
                                    const response = await axios.post(`${url}/reset-request`, {
                                        email: values.email,
                                    });
                                    console.log(response.data);
                                } catch (error) {
                                    console.error("Password reset error: ", error);
                                }
                                setTimeout(() => {
                                    navigate("/info");
                                }, 1000);
                            } catch (error) {
                                console.log(error);
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: error
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
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        isInvalid={touched.email && !!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
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
                        <p className='text-center'>Remembered the password return to <a className="text-decoration-none primary" href="/login">Login</a></p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RequestPassword;
