import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string,token:string) => {

    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

   const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "رسالة تاكيد بريدك الالكتروني",
        html: `<p> اضغط هنا  <a href="${confirmLink}">لتاكيد البريد الالكترونى</a></p>`,
    })


}

export const sendPasswordResetEmail = async (email: string,token:string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "رسالة تاكيد بريدك الالكتروني",
        html: `<p> اضغط هنا  <a href="${resetLink}">لاعادة ظبط كلمة المرور</a></p>`,
    })
}
