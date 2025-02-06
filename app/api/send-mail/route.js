import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    const { city, companyName, contactName, email, message, phone, state, zip } = await req.json();

    // Add debugging for environment variables
    console.log('Environment Variables:', {
        host: process.env.NEXT_PUBLIC_EMAIL_HOST,
        email: process.env.NEXT_PUBLIC_EMAIL,
        hasPassword: !!process.env.NEXT_PUBLIC_APP_PASSWORD_FOR_EMAIL
    });

    const transporter = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL,
            pass: process.env.NEXT_PUBLIC_APP_PASSWORD_FOR_EMAIL,
        },
    });

    try {
        // Add debugging for email configuration
        console.log('Attempting to send email with config:', {
            host: transporter.options.host,
            port: transporter.options.port,
            secure: transporter.options.secure,
            auth: {
                user: transporter.options.auth.user,
                // Don't log the actual password
                hasPassword: !!transporter.options.auth.pass
            }
        });

        await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: process.env.NEXT_PUBLIC_EMAIL,
            subject: `Contact Email`,
            html: `
                <p><strong>Contact Name: </strong>${contactName}</p>
                <p><strong>Company Name: </strong>${companyName}</p>
                <p><strong>City: </strong>${city}</p>
                <p><strong>Email: </strong>${email}</p>
                <p><strong>Phone: </strong>${phone}</p>
                <p><strong>State: </strong>${state}</p>
                <p><strong>Zip: </strong>${zip}</p>
                <p><strong>Message: </strong>${message}</p>
            `,
        });

        console.log('Email sent successfully');
        return new NextResponse(
            JSON.stringify({
                status: "ok",
                message: "Email sent",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Email sending error:', {
            message: error.message,
            code: error.code,
            dns: error.dns,
            stack: error.stack
        });
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
                errorCode: error.code,
                dnsError: error.dns,
                stack: error.stack, 
            }),
            { status: 500 }
        );
    }
}
