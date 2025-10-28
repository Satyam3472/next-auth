import connect from '@/db/dbConfig'
import User from '@/models/userModel.js'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password, username} = reqBody;

        if(!email || !password){
            return NextResponse.json({message: 'Email and Password are required', status:400}, {status: 400})
        }

        const user = await User.findOne({email});
        if(user){ return NextResponse.json({message: 'User already exists. Please login', status:400}, {status: 400}) }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        console.log('User Registered:', savedUser);

        return NextResponse.json({
            message: 'User registered successfully',
            success: true,
            savedUser,
            status: 200
        })


    } catch (error) {
        console.log('Signup Error:', error);
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500})
    }
}