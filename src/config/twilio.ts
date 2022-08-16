import { Twilio } from "twilio"
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
import dotenv from 'dotenv'
dotenv.config();


//initialize twilio client
const client = new Twilio(accountSid, authToken);

export const sendOtp = async (phoneNumber: string, otp: string) => {
    try {
        if (phoneNumber && otp) {
            const message = await client.messages
                .create({
                    body: `This is your verification code for Cadarch App ${otp}`,
                    from: `+12025178039`,
                    to: `${phoneNumber}`
                })
            if (!message.errorCode) {
                return true
            }
            else {
                return false
            }
        }
        else {
            console.log('phoneNumber or otp miossing')
            return false
        }
    }
    catch (e) {
        console.log(e, "error")
        return false
    }
}
