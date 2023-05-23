'use client';
import { useState } from 'react';
// Module CSS
import styles from './styles.module.css';
// Toast
import toast, { Toaster } from 'react-hot-toast';
// Formik
import { Form, Formik } from 'formik';
import userLoginSchema from '@/FormikValidationSchema/userLogin';
//Components
import { TextField, Button, ErrorText } from '@/components';
// Next
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Next Auth
import { SignInResponse, signIn } from 'next-auth/react';

const LoginForm:React.FC = () => {
  const initialValues = { email: '', password: '' };
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <section className={`${isLogin && 'blur'} ${styles.container}`}>
        <Formik
          initialValues={initialValues}
          validationSchema={userLoginSchema}
          onSubmit={async (values) => {
            const response:SignInResponse | undefined = await signIn('credentials', {
              email: values.email,
              password: values.password,
              redirect: false,
            });
            console.log(response);
            if(response?.error) return toast.error(response?.error ? response.error : 'Bir hata oluştu!');

            setIsLogin(true);
            toast.success('Giriş Başarılı!');
            const timeOut = setInterval(() => {
              router.push('/');
              clearInterval(timeOut);
            }, 2000);
            return timeOut;
        }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} className={styles.form}>
              <div className={styles.titleContainer}>
                <h1 className={styles.title}>Giriş Yap</h1>
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
              <Button type='submit' disabled={isLogin}>
                Giriş Yap
              </Button>
              <Link
                href='/auth/sign-up'
                className='text-white font-semibold mt-6 flex justify-end'
              >
                Daha önce kayıt olmadınız mı?
              </Link>
              <Link
                href='/auth/forget-password'
                className='text-white font-semibold mt-2 flex justify-end'
              >
                Şifremi unuttum
              </Link>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
}

export default LoginForm;