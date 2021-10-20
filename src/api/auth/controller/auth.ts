import config from '../../../config';
import { SignUp } from '../models/signup';
import database from "../../../loaders/database";
import { Login } from "../models/login";
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';
export const logInController = async(user:Login):Promise<string> =>{
    console.log('Abhinav');
    const data:{_id:ObjectId,email:string,password:string} = await (await database()).collection('users').findOne({email:user.email});
    console.log(data);
    if(data === null){
        return null;
    }else{
        const token = jwt.sign({id:data._id},config.jwtSecret);
        return bcrypt.compareSync(user.password,data.password)?token:null;
    }
}

export const SignUpController = async(user:SignUp):Promise<boolean> =>{
    const data = await(await database()).collection('users').find({email:user.email}).toArray();
    if(data.length === 0){
        if(user.password === user.newPassword){
        const salts = bcrypt.genSaltSync(config.saltRounds);
        const hashedPassword = bcrypt.hashSync(user.password,salts);
        const hashedConfirmPassword = bcrypt.hashSync(user.newPassword,salts);
    user.password = hashedPassword ;
            user.newPassword = hashedConfirmPassword;
            await (await database()).collection('users').insertOne(user);
            return true;
}
    }
    else{
        return false;
    }
}