
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SERVER_MAILID,
      pass: process.env.SERVER_MAIL_PASS,
    },
  });

exports.sendMail = (req, res,next) => {
    const mailOptions = {
        from: process.env.SERVER_MAILID,
        to: process.env.SERVER_MAILID,
        subject: req.body.model,
        html: buildmail(req.body),
        attachments: [{
          filename: 'logo.png',
          path: './logo.png',
          cid: 'logo'
        }]
      }; 
      transporter.sendMail(mailOptions).then(
        next()
      ).catch((err)=>{console.error
        return res.status(500).json({ msg: err });
     });
};
exports.sendCustomerMail = (req, res,next) => {
    const mailOptions = {
        from: process.env.SERVER_MAILID,
        to: req.body.custEmail,
        subject: req.body.model,
        html: resMailBuilder(req.body),
        attachments: [{
          filename: 'logo.png',
          path: './logo.png',
          cid: 'logo'
        }]
      };   
      transporter.sendMail(mailOptions).then(info => {
        return res.status(200).json(
         {
             msg: "Email sent",
             info: info.messageId,
             preview: nodemailer.getTestMessageUrl(info)
         }
     )
     }).catch((err)=>{console.error
        return res.status(500).json({ msg: err });
     });
};
  
  function  buildmail(requestBody){
      var mailString='<div style="border: 1px solid black; min-width: 100px;min-height: 50px;background-color: #09161e;">'
          mailString +='<center><img src="cid:logo" width="150px"></center>'
          mailString +='</div>'
          mailString +=' <div style="border: 1px solid rgb(132, 131, 131); min-width: 100px;min-height: 200px;">'
          mailString +='<h3>New order for You Rajesh !!</h3>'
          mailString +='<h4>Order details:</h4>'
          mailString +='<p>Coustomer Name: '+requestBody.custName+'<br>'
          mailString +='Coustomer Email Id:'+requestBody.custEmail+'<br>'
          mailString +='Coustomer Email Id:'+requestBody.custMobile+'<br>'
          mailString +='Model Requseted: '+requestBody.model+'<br>'
          mailString +='Quantity: '+requestBody.quantity+'<br>'
          mailString +='Product delivery date & Time Feasiablity: '+requestBody.deliveryDate+'<br>'
          mailString +='Message from the coustomer: '+requestBody.custMessage+'</p>'
          mailString +='</div>'
    return mailString;
  }
  
  function resMailBuilder(requestBody){
    var mailString='<div style="border: 1px solid black; min-width: 100px;min-height: 50px;background-color: #09161e;">'
        mailString +='<center> <img src="cid:logo" width="150px"> </center>'
        mailString +='</div>'
        mailString +='<div style="border: 1px solid rgb(132, 131, 131); min-width: 100px;min-height: 200px;">'
        mailString +=' <h1>Welcome to SAFE H2O4!</h1>'
        mailString +='<h5>A warm welcome to our product family! We re thrilled to have you on board.</h5>'
        mailString +='Thank you for showing interest in our products. We re excited to help you find the perfect solution for your needs.'
        mailString +=' <p>Best regards,</p>'
        mailString +='<p>The SAFE H2O4 Team</p>'
        mailString +='</div> '
        return mailString;
  }