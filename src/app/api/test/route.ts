// import { Resend } from "resend";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//     const resend = new Resend(process.env.RESEND_API_KEY as string);

//     try {
//         const {data} = await resend.emails.send({
//             from: 'infoxenotech@resend.com',
//             to: 'infoxenotech@gmail.com',
//             subject: 'Test Email',
//             html: '<p>This is a test email sent using Resend.</p>'
//         });

//         return NextResponse.json({ message: "Email sent successfully", data }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: ["Error sending email", (error as Error).message] }, { status: 500 });
//     }
// }


import { log } from "console";
import { MailtrapClient } from "mailtrap";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // const { MailtrapClient } = require("mailtrap");

    const TOKEN = "6ad3f18fbb86d66140deb25e3123cdb6";

    const client = new MailtrapClient({
        token: TOKEN,
    });

    const sender = {
        email: "hello@demomailtrap.com",
        name: "Mailtrap Test",
    };
    const recipients = [
        {
            email: "codewitharyansh07@gmail.com",
        }
    ];

    client
        .send({
            from: sender,
            to: recipients,
            subject: "You are awesome!",
            text: "Congrats for sending test email with Mailtrap!",
            category: "Integration Test",
        })
        .then(console.log, console.error);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
}