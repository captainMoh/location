const nodemailer = require('nodemailer');


exports.sendMessage = async (req, res) => {

    const information = req.body.object

    try {
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            },
        });
    
        let info = await transporter.sendMail({
            from: 'aichoun026@gmail.com',
            to: `${information.mail}`,
            subject: `${information.nom}`,
            text: `${information.message}`
        });
    } catch (err) {
        console.log(err);
    }
}