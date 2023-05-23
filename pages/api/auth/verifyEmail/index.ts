import { NextApiRequest, NextApiResponse } from 'next';
// Custom Error
import { CreateError, ValidateError } from '@/utils/customError';
// bcrypt
import bcrypt from 'bcryptjs';
// Prisma CRUD
import { DeleteManyData, FindByUniqueData, UpdateData } from '@/utils/prisma/crud';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') throw new Error(CreateError(405, "Method not allowed."));

        const {key, email, time} = req.body;
        if(!key || !email || !time) throw new Error(CreateError(422,'There is a missing or incorrect condition in your data. Please contact an authorized person.'));

        const verifyEmailData = await FindByUniqueData("VerifyEmail", {secretKey: key});
        if(verifyEmailData == null || !verifyEmailData) throw new Error(CreateError(404, 'We could not find verification data. Please contact an authorized person.'));
        
        const currentTime = Date.now();
        const LifeTime = currentTime - verifyEmailData.validTime;
        const pastHour = Math.floor((LifeTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // TODO: 24 saat geçmişse veritabanından sil.
        console.log("aaaa")

        if(pastHour >= 24){
            const {error} = await DeleteManyData("VerifyEmail", {email: verifyEmailData.email});
            if (error) throw new Error(CreateError(400, error.message));

            throw new Error(CreateError(410, 'Your email address has expired. Please send a new verification mail.'));
        } 

      
        
        const decryptedEmail = await bcrypt.compare(verifyEmailData.email, email);
        if(decryptedEmail == null) throw new Error(CreateError(400,'Your email address is not valid. Please contact an authorized person.'));

        const existingUser = await FindByUniqueData("User", {email: verifyEmailData.email});
        if(existingUser == null || existingUser == undefined) throw new Error(CreateError(404, 'Your account doesn\'t exist.'));

        if(existingUser.verified) throw new Error(CreateError(410, 'Your e-mail address has already been confirmed!'));

        const updateUser = await UpdateData("User", {email: existingUser.email}, {verified: true})
        if(updateUser){
            return res.status(200).json({status: 200, message: "Your e-mail address has been successfully confirmed!"});
        }
        
        throw new Error(CreateError(400, 'Something went wrong. Please contact an authorized person.'));

    } catch (error:any) {
        const validateError = ValidateError(error.message);
        if(validateError){
            return res.status(validateError.status).json({ status: 'error', message: validateError.message});
        }
        return res.status(404).json({ status: 'error', message: error.message});
    }


        


//         

}

export default handler;