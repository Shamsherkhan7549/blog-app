import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async(req, res) => {
    
    try {
        const {email , message} = req.body.contactInfo;
      // Create transporter
      const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                 pass:process.env.EMAIL_PASS
            }
        });
        // Mail options
        const mailOptions = {
            from: email,
            to:process.env.EMAIL_USER,
            subject: 'New Message from Blog App', 
            text: `You have received a new message from ${email}:\n\n${message}`
        }
        // Send email
        const info = await transporter.sendMail(mailOptions);
        res.json({success:true, message:"Email sent successfully"});
    } catch (error) {
        console.log(error);
        
        res.json({success:true, message:error.message});
        
    }
        

};

export default sendEmail;