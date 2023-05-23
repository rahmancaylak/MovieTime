import prisma from './prismadb';

const GetAllData = async (tableName:string) : Promise<any> => {
  try {
    return await prisma[tableName].findMany();
  } catch (error:unknown) {
    return error;
  }
}

// Find By Unique Value
export async function FindByUniqueData(tableName:string, where:object) : Promise<any>{
  try {
    const data = await prisma[tableName].findUnique({
      where: where,
    });
    return data;
  } catch (error:unknown) {
    return error;
  }
}

//Find By Many Value
const FindByManyData = async (tableName:string, where:object) : Promise<any> => {
  try {
    return await prisma[tableName].findMany({
      where: where,
    });
  } catch (error) {
    return error;
  }
}

// Create New Data
export async function CreateData (tableName:string, data:object) : Promise<any>{
  try {
    return await prisma[tableName].create({
      data: data,
    });
  } catch (error) {
    return error;
  }
}

// Update Data
export async function UpdateData(tableName:string, where:object, data:object) : Promise<any>{
  try {
    return await prisma[tableName].update({
      where: where,
      data: data,
    });
  } catch (error) {
    return error;
  }
}

// Delete Data
const DeleteData = async(tableName:string, where:object) : Promise<any> => {
  try {
    return await prisma[tableName].delete({
      where: where,
    });
  } catch (error) {
    return error;
  }
}

// Delete Many Data
export const DeleteManyData = async (tableName:string, where:object) : Promise<any> =>{
  try {
    return await prisma[tableName].deleteMany({
      where: where,
    });
  } catch (error) {
    return error;
  }
}

export default {
  GetAllData,
  FindByUniqueData,
  FindByManyData,
  CreateData,
  UpdateData,
  DeleteData,
  DeleteManyData
}
