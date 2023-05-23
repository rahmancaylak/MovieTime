'use client';
// Module CSS
import styles from './styles.module.css';
// Toast
import toast, { Toaster } from 'react-hot-toast';
// Formik
import { Form, Formik } from 'formik';
import userRegisterSchema from '@/FormikValidationSchema/userRegister';
// Services
import { FetchAPI } from '@/utils/fetchAPI';
//Components
import { TextField, Button, ErrorText } from '@/components';
// Next Auth
import { signIn } from 'next-auth/react';

import Link from 'next/link';

const SignUpForm: React.FC = () => {
  const fetchApi = new FetchAPI();
  const initialValues = { email: '', password: '', passwordConfirm: '' };
  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <section className={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={userRegisterSchema}
          onSubmit={async (values)=> {
            const { passwordConfirm, ...user } = values;
            const data = await fetchApi.post({
                  controller: 'auth/register',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
                user
              ).then((res) => res.json());
              if (data.status != 201) {
                return toast.error(data.message);
              }
              toast.success(data.message);
              return signIn();

          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} className={styles.form}>
              <div className='flex justify-center mb-6'>
                <h1 className='text-2xl text-white font-bold'>Kayıt Ol</h1>
              </div>
              <div className={styles.formGroup}>
                <TextField
                  label='E-Mail'
                  type='email'
                  placeholder='movietime@gmail.com'
                  id='E-Mail'
                  name='email'
                  value={props.values.email}
                  onChange={props.handleChange}
                />
                {props.touched.email && (
                  <ErrorText>{props.errors.email}</ErrorText>
                )}
              </div>
              <div className={styles.formGroup}>
                <TextField
                  label='Şifre'
                  type='password'
                  placeholder='***************'
                  id='Password'
                  name='password'
                  value={props.values.password}
                  onChange={props.handleChange}
                />
                {props.touched.password && (
                  <ErrorText>{props.errors.password}</ErrorText>
                )}
              </div>
              <div className={styles.formGroup}>
                <TextField
                  type='password'
                  label='Şifre Doğrula'
                  placeholder='***************'
                  id='Password Confirm'
                  name='passwordConfirm'
                  value={props.values.passwordConfirm}
                  onChange={props.handleChange}
                />
                {props.touched.passwordConfirm && (
                  <ErrorText>{props.errors.passwordConfirm}</ErrorText>
                )}
              </div>
              <div className='flex flex-col items-end'>
                <Button type='submit'>Kayıt Ol</Button>
                <Link href='/auth/login' className={styles.loginButton}>
                  Hesabınız var mı?
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default SignUpForm;
