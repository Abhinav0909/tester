import {Router,Response,Request} from "express";
import Joi from 'joi';
import { addValue, deleteValue, getValue, replaceValue } from "../controller/address";
const addressRouter = Router();
const getAddress = async(req:Request,res:Response) =>{
    try{
        const schema = Joi.object({
           id:Joi.string().required(),
        })
        const{value,error} = schema.validate(req.body);
        if(error){
            throw{
                status:422,
                message:'Validation Error',
            }
        }
        else{
            const val = await getValue(value);
            res.status(201).json({
                message:'Get value',
                val:val
            })
        }
    }catch(err){
        res.status(err.status || 500).json({
            message:err.message || "Internal error occured"
        })
    }
}
const addAddress = async(req:Request,res:Response) => {
    try{
        const schema = Joi.object({
            name:Joi.string().required(),
            address:Joi.string().required(),
            phoneNumber:Joi.number().required()
        })
        const {value,error} = schema.validate(req.body);
        if(error){
            throw{
                status:422,
                message:'Validation error',
            }
        }else{
          const val = await addValue(value);
          console.log(val);
          
          res.status(201).json({
              message:'Value added',
              val:val
          })
          }
    }catch(err){
        res.status(err.status || 500).json({
            message:err.message || "Internal server occured",
        })
    }
}
const deleteAddress = async(req:Request,res:Response) =>{
    try{
        const schema = Joi.object({
            name:Joi.string().required(),
            address:Joi.string().required(),
        })
        const {value,error} = schema.validate(req.body);
        if(error){
            throw{
                status:422,
                message:'Validation Error',
            }
        }else{
            const val = await deleteValue(value);
            res.status(201).json({
                message:"Value deleted",
                val:val
            })
        }
    }catch(err){
        res.status(err.status || 500).json({
            message:err.message || "Internal server occured"
        })
    }
}

const replaceAddress = async(req:Request,res:Response) =>{
    try{
        const schema = Joi.object({
            name:Joi.string().required(),
            address:Joi.string().required(),
            phoneNumber:Joi.number().required(),
            id:Joi.string().required()
        })
        const{value,error} = schema.validate(req.body);
        if(error){
            throw{
                status:422,
                message:'Validation Error',
            }
        }
        else{
            const val = await replaceValue(value);
            res.status(201).json({
                message:'Replace value',
                val:val
            })
        }
    }catch(err){
        res.status(err.status || 500).json({
            message:err.message || "Internal error occured"
        })
    }
}
addressRouter.get('/',getAddress);
addressRouter.post('/add',addAddress);
addressRouter.delete('/delete',deleteAddress);
addressRouter.put('/replace',replaceAddress);
export default addressRouter;
