import React, { useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useLoginSuperAdminMutation, useSuperAdminProfileQuery } from "../../feature/api/apiSlice";
import { useFormik } from "formik";
import { superAdminForm } from '../../schemas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useAppDispatch } from '../../app/hook';
import { loginSuperAdmin } from '../../feature/sadminSlice';

const initialValues = {
    username: "",
    password: "",
}

export interface SuperAdmin {
    _id: string
    username: string,
    password: String,
    role: String
}

type LoginResponse = {
    success: boolean,
    sadmin: SuperAdmin,
    token: String
}

const Login: React.FC = () => {



    const dispatch = useAppDispatch();

    const showToastMessage = (message: String) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const [loginSuperAdmin, { isLoading, isError, isSuccess, error }] = useLoginSuperAdminMutation();
    const [form] = Form.useForm()
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: superAdminForm,
        onSubmit: async (values) => {

            const {username,password} = values;


            try {
                dispatch({
                    type: "LoginRequest",
                })

                const { data } = await loginSuperAdmin({
                    username: values.username,
                    password: values.password
                })

                dispatch({
                    type: "LoginSuccess",
                    payload: data.sadmin,
                })
            } catch (error) {
                dispatch({
                    type: "LoginFailure",
                    payload: error
                })
            }

            form.resetFields();


        }
    })

    const onSubmitForm = () => {
        if (!errors) {
            form.resetFields();
        }
    };


    return (
        <>
            <ToastContainer />
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={handleSubmit}
                form={form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: "please enter username" },
                        { whitespace: true },
                        {
                            min: 2,
                            max: 40,
                            message: "field must be at least 2 and at most 40 characters ",
                        },
                    ]}
                    hasFeedback
                >
                    <Input
                        className='input-box'
                        placeholder='username'
                        bordered={true}
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        allowClear={true}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "please enter password" },
                        { whitespace: true },
                        {
                            min: 2,
                            max: 40,
                            message: "field must be at least 2 and at most 40 characters ",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        className='input-box'
                        placeholder='password'
                        bordered={true}
                        type="text"
                        value={values.password}
                        onChange={handleChange}
                        allowClear={true}
                    />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button htmlType="submit" type='primary' onClick={onSubmitForm}>Login</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Login;