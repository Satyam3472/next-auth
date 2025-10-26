import connect from '@/db/dbConfig'
import User from '@/models/userModel.js'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        console.log(reqBody);
        const {email, password} = reqBody;

        if(!email || !password){
            return NextResponse.json({message: 'Email and Password are required'}, {status: 400})
        }

        const user = await User.findOne({email});
        if(!user){ return NextResponse.json({message: 'User Not Found. Please Sign Up'}, {status: 400}) }

        const matchFound = await bcrypt.compare(password, user.password);
        if(!matchFound){
            return NextResponse.json({message: 'Invalid Credentials'}, {status: 400})
        }
        //Create TOKEN DATA
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: '1d'});

        const responseData = NextResponse.json({
            message : "Login Successful",
            success : true,

        });

        responseData.cookies.set('token', token, {
            httpOnly: true,
        });

        return responseData;

    } catch (error) {
        console.log('Login Error:', error);
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500})
    }
}