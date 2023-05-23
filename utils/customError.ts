
const CreateError = (status:number, message:string) : string  =>{
    const error = { status: status, message: message};
    return JSON.stringify(error);
}

const ValidateError = (str:string) : boolean | any => {
    try {
        if(typeof str !== "string"){
            return false;
        }
        const error = JSON.parse(str);
        return error;
    } catch (error) {
        return false
    }
}

export {CreateError, ValidateError};