import { NextApiRequest, NextApiResponse } from 'next';
// PasswordHash
import EncryptPassword from '@/utils/encryptPassword';
// Prisma Services
import { CreateData, FindByUniqueData } from '@/utils/prisma/crud';
// Validate ENV
import ValidateEnv from '@/utils/validateEnv';
// NodeMailer
import { transporter, mailOptions } from '@/utils/nodemailer';
// Custom Error
import {ValidateError, CreateError} from '@/utils/customError';

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Please fill in all fields.');

    const existingUser = await FindByUniqueData('User', { email: email });
    if (existingUser != null){
        throw new Error(CreateError(409, "User already exists."));
    }

    const secretKey = await EncryptPassword(ValidateEnv(process.env.MAIL_SECRET));
    const hashedPassword = await EncryptPassword(password);
    const hashedMail = await EncryptPassword(email);

    if (secretKey === null || hashedPassword === null || hashedMail === null)
      throw new Error('Password or Mail is empty.');

    const date = new Date();
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const time = date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
    const fullDate = `${day}.${month}.${year} UTC:${time}`;

    const user = await CreateData('User', {email: email, password: hashedPassword});
    if (user) {
      const verifyMail = await CreateData('VerifyEmail', {
        email: email,
        secretKey: secretKey,
        validTime: Date.now(),
      });

      if (!verifyMail || verifyMail == undefined) throw new Error('Failed to send verification mail. Please contact an authorized person.');

      //Send Mail
      transporter.sendMail({
        ...mailOptions,
        subject: `Movie Time Sitesinde Başarıyla Kayıt Oldunuz!`,
        to: email,
        createTime: { date, time },
        html: `
                    <p>Merhaba</p>
                    <p>${email} mail adresinin Kayıt işlemi ${fullDate} tarihinde başarıyla yapıldı!</p>
                    <a href = ${
                      process.env.NEXTAUTH_URL
                    }/auth/verifyEmail?key=${secretKey}&time=${Date.now()}&email=${hashedMail}>
                        <button>
                            Hesabınızı Onaylamak İçin Tıklayın.
                        </button>
                    </a>
                    `,
      });
      return res.status(201).json({ status: 201, message: 'Registration Successful.' });
    }
    throw new Error('Registration failed.');
  } catch (e:any) {
    const validateError = ValidateError(e.message);
    if (validateError) {
      const error = JSON.parse(e.message);
      return res.status(error.status).json({ status: error.status, message: error.message});
    }
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export default handler