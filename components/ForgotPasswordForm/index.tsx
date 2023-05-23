// 'use client';
// import { useState } from 'react';
// // Module CSS
// import styles from './styles.module.css';
// // Toast
// import toast, { Toaster } from 'react-hot-toast';
// // Formik
// import { Form, Formik } from 'formik';
// import userForgotPasswordSchema from '@/FormikValidationSchema/userForgotPassword';
// //Components
// import { TextField, Button, ErrorText } from '@/components';
// // Next
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// export default function ForgotPasswordForm() {
//   const [isLogin, setIsLogin] = useState(false);
//   const router = useRouter();

//   return (
//     <>
//       <Toaster position='top-right' reverseOrder={false} />
//       <section className={`${isLogin && 'blur'} ${styles.container}`}>
//         <Formik
//           initialValues={{ email: '' }}
//           validationSchema={userForgotPasswordSchema}
//           onSubmit={async (values) => {
//             const data = fetchApi
//               .post(
//                 {
//                   controller: 'auth/forgotPassword',
//                   headers: {
//                     'Content-Type': 'application/json',
//                   },
//                 },
//                 user
//               )
//               .then((res) => res.json());
//             data.then((res) => {
//               if (res.status === 'success') {
//                 return toast.success(res.message);
//               }
//               return toast.error(res.message);
//             });
//           }}
//         >
//           {(props) => (
//             <Form onSubmit={props.handleSubmit} className={styles.form}>
//               <div className={styles.titleContainer}>
//                 <h1 className={styles.title}>Şifremi Unuttum</h1>
//               </div>
//               <div className={styles.formGroup}>
//                 <TextField
//                   label='E-Mail'
//                   type='email'
//                   placeholder='movietime@gmail.com'
//                   id='E-Mail'
//                   name='email'
//                   value={props.values.email}
//                   onChange={props.handleChange}
//                 />
//                 {props.touched.email && (
//                   <ErrorText>{props.errors.email}</ErrorText>
//                 )}
//               </div>
//               <Button type='submit' disabled={isLogin}>
//                 Şifremi Sıfırla Maili Gönder
//               </Button>
//             </Form>
//           )}
//         </Formik>
//       </section>
//     </>
//   );
// }


const ForgotPasswordForm: React.FC = () => {
  return (
    <>
    </>
  )
}

export default ForgotPasswordForm