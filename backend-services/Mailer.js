const path = require('path');
var nodemailer = require('nodemailer');
var NodeMailer = module.exports;
NodeMailer.sendMail = function (_apiRequest, _apiResponse) {
  console.log("entered mailer")
  let {
    name,
    email,
    subject,
    message
  } = _apiRequest.body;
  var smtpConfig = {
    service: 'Gmail',
    auth: {
      user: 'venkatesh.y@way2online.co.in',
      pass: 'v7207455147'
    }
  };
  console.log("entered mailer")
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport(smtpConfig);

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: "OneSpot Support", // sender address
    to: "venkatesh.y@way2online.co.in,vikrant.d@way2online.co.in", // list of receivers
    subject: subject, // Subject line
    text: message, // plaintext body
    html: '<!doctype html>\n<html lang="en">\n' +
      '\n<meta charset="utf-8">' +
      '<style type="text/css">* {color:#613400;font-size:14px;font-weight:bold;font-family:Calibri,Helvetica, Arial, Sans-Serif;}</style>\n' +
      '\n\n' +
      '<div><h6>Name : ' + name + '</h6><h6>Email : ' + email + '</h6><h6>Message : ' + message + '</h6></div>' +
      '\n\n' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
        console.log("entered mailer")
    }
    return _apiResponse.send(info)
    console.log('Message sent: ' + info.response);
    console.log("entered mailer")
  });

}
NodeMailer.updateMail = function(_apiRequest,_apiResponse){
  console.log("entered update  mailer")
  let {
    emailUpdate,
  } = _apiRequest.body;
  var smtpConfig = {
    service: 'Gmail',
    auth: {
      user: 'venkatesh.y@way2online.co.in',
      pass: 'v7207455147'
    }
  };
  console.log("entered  update mailer")
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport(smtpConfig);

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: "OneSpot Support", // sender address
    to: "venkatesh.y@way2online.co.in,vikrant.d@way2online.co.in",// list of receivers
    subject:"this is an mail update ", // Subject line
    text: emailUpdate, // plaintext body
    html: '<!doctype html>\n<html lang="en">\n' +
      '\n<meta charset="utf-8">' +
      '<style type="text/css">* {color:#613400;font-size:14px;font-weight:bold;font-family:Calibri,Helvetica, Arial, Sans-Serif;}</style>\n' +
      '\n\n' +
      '<div><h6>Email : ' + emailUpdate+ '</h6></div>'
   // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
        console.log("update mailer")
    }
    return _apiResponse.send(info)
    console.log('Message sent: ' + info.response);
    console.log("undate mailer")
  });
}

