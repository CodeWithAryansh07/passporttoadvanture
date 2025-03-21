import { connectDB } from "@/config/dbConfig";
import User from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connectDB();

export async function POST(request: NextRequest) {
    const { email, password, remember } = await request.json();

    try {

        if (!email || !password) {
            return NextResponse.json({ error: ["Please provide all fields"] }, { status: 400 });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return NextResponse.json({ error: ["User not found"] }, { status: 404 });
        }


        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ error: ["Invalid credentials"] }, { status: 401 });
        }

        let token = "";

        if (remember) {
            console.log("Remember me is true");
            
            token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "30d" });
            const cookieStore = await cookies();
            cookieStore.set({
                name: "token",
                value: token,
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                maxAge: 2592000,
                secure: true,
            });

            return NextResponse.json({ message: "Login successful" }, { status: 200 });
        }
        user.lastLogin = new Date();
        await user.save();

        return NextResponse.json({ message: "Login successful" }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: ["Server error", (error as Error).message] }, { status: 500 });
    }
}