import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {Model} from 'mongoose';
import { User } from '../user/entities/user.entity';
import { sign } from 'jsonwebtoken';
const bcrypt = require('bcryptjs')
require('dotenv').config()

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async login(email: String, password: String){
        const user = await this.userModel.findOne({email: email})
        if (!user){ 
            return ({error: "Incorrect user or password!"})
        }
        const userid = user._id.toString()

        const authenticated = await bcrypt.compare(password, user.password)
        if (authenticated == false){
            return ({error: "Incorrect user or password"})
        }

        const token = sign({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        },
        process.env.secretkey,
        {
            subject: userid,
            expiresIn: '30d'
        }
        )

        return ({
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: token
        })
    }
}
