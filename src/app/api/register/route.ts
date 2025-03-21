import { connectDB } from "@/config/dbConfig"
import User from "@/models/users"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
// import { Resend } from "resend"

connectDB()

export async function POST(request: NextRequest) {
    const { username, email, password } = await request.json()

    try {

        if (!username || !email || !password) {
            return NextResponse.json({ error: ["Please provide all fields"] }, { status: 400 })
        }


        const doesUserExist = await User
            .findOne({ $or: [{ username }, { email }] })
        if (doesUserExist) {
            return NextResponse.json({ error: ["User already exists"] }, { status: 400 })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            // const otp = Math.floor(100000 + Math.random() * 900000).toString()
            // const otpExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now

            const otp = "123456"
            const otpExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now

            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
                lastLogin: new Date(),
                isVerified: false,
                otp,
                otpExpires,
            })

            if (!user) {
                return NextResponse.json({ error: ["Error creating user"] }, { status: 500 })
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "30d" })
            // const resend = new Resend(process.env.RESEND_API_KEY as string)

            // const { data } = await resend.emails.send({
            //     from: 'infoxenotech@gmail.com',
            //     to: email,
            //     subject: 'Verify your email address',
            //     html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`
            // })


            return NextResponse.json({ user, token }, { status: 201 })
        }
    } catch (error) {

        return NextResponse.json({ error: ["Error creating user", (error as Error).message] }, { status: 500 })
    }
}