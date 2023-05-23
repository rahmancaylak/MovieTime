import * as Yup from 'yup';

const userForgotPasswordSchema = Yup.object({
  email: Yup.string()
    .required('e mail boş bırakılamaz.')
    .email('Geçerli bir e mail adresi giriniz.'),
});

export default userForgotPasswordSchema;
