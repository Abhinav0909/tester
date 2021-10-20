import { Request,Response,Router } from "express";
import Joi from "joi";
import { logInController, SignUpController } from "../controller/auth";
const authRouter = Router();

const loginHandler = async(req:Request,res:Response) =>{
    try{
        const schema = Joi.object({
           email:Joi.string().email().required(),
           password:Joi.string().min(6).max(12).required(),
        })
        const {value,error}= schema.validate(req.body);
        if(error){
            throw{
                status:422,
                message:'Validation Error',
            }
        }else{
            const val = await logInController(value);
            if(val === null){
                throw{
                    status:401,
                    message:"Password doesn't match",
                }
            }else{
                res.status(200).json({
                    message:"Login Successful",
                    token:val,
                })
            }
        }
    }catch(err){
       res.status(err.status || 500).json({
           message:err.message ||"Internal Server Error"
       })
    }
}

const signUpHandler = async(req:Request,res:Response) =>{
    try{
        const schema = Joi.object({
            name:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string().min(6).max(12).required(),
            newPassword:Joi.string().min(6).max(12).required(),
        })
        const {value,error} = schema.validate(req.body);
        if(error){
            throw{
                status:422,
                message:"Validation Error",
            }
        }else{
          const val = await SignUpController(value);
            if(val === true){
                res.status(201).json({
                    message:"User Created",
                })
            }else{
                res.status(203).json({
                    message:"User already exists",
                })
            }
        }

    }catch(err){
        res.status(err.status || 500).json({
            message:err.message || "Internal Server Error",
        })
    }
}
authRouter.post('/login',loginHandler);
authRouter.post('/signUp',signUpHandler);
export default authRouter;