// Author : Monisha J (B00881079)
var nodemailer = require('nodemailer');
const userController = require('../controllers/userController');

let transporter = nodemailer.createTransport({
    "host": "smtp.gmail.com",
    "port": 587,
    "secure": false,
    "auth": {
        user: "stockverse7@gmail.com", 
        pass: "stockversE123@"
    },
});
exports.sendEmails = async (req, res) => {
    try {
        const {subscription, subject, content} = req.body;
        let user = await userController.getUsersBySubscription(subscription === "premium" ? true : false);
        user = user.map((u) => u.email);
        console.log(user);
        var mailOptions = {
            from: 'STOCKVERSE <stockverse@gmail.com>',
            to:"",
            bcc: [...user, "monishajayabarathi@gmail.com"],
            subject: subject,
            html: `<!DOCTYPE html>
            <html> 
                <head>
                    <title></title>
                </head>
                <body>
                <p>Hi,</p></n>
                <p>${content}</p></n>
                <p>Thanks</p>
            </body>
            </html>`
          };
        
          let response = await transporter.sendMail(mailOptions);
          res.status(200).json({
            success: true,
            emailCount: user.length,
            response
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message || "Cannot send email, please try again",
            success: false,
        });
    }
};
