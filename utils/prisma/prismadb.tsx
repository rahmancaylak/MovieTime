import { PrismaClient } from '@prisma/client'
import ValidateEnv from '@/utils/validateEnv';


const NODE_ENV:string = ValidateEnv(process.env.NODE_ENV)
let prisma:any
const globalObject: any = global;
if (NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!globalObject.prisma) {
    globalObject.prisma = new PrismaClient()
  }
  prisma = globalObject.prisma
}

export default prisma