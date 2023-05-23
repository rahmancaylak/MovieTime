import bcrypt from 'bcryptjs';

const EncryptPassword = async (password:string) : Promise<string | unknown> => {
  try {
    if (!password) throw new Error('Error: Password is empty');
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  } catch (error:unknown) {
    return error;
  }
}

export default EncryptPassword;