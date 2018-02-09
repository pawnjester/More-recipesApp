import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const mailOptions = (to, subject, html) => ({
  from: ' "MoreRecipes" <noreply@morerecipes.com>',
  to,
  subject,
  html
});

export const templates = {
  recovery: (req, user) => `
  <div>

<div style="background-color:#f2f3f5 ;padding:20px">
  <div style="max-width:600px;margin:0 auto">
    <div style="
       background:#fff;
       font:14px sans-serif;
       color:#686f7a ;
       border:2px solid #ff4500 ;
       margin-bottom:10px">
      <div style="
        border-bottom:1px solid #f2f3f5 ;
        padding-bottom:20px;
        padding-top:20px">
        <h4 style="
           padding-top:0;
           padding-left:20px;
           margin:0;
           font-size:30px;
           font-family:'Kurale', serif;">
          More Recipes</h4>
      </div>
      <div style="padding:10px 20px;line-height:1.5em;color:#686f7a ">
        <p style="
           padding-bottom:20px;
           margin:20px 0;
           color:#686f7a ">
          Hello, ${user.username}
        </p>
        <p style="
           padding-bottom:20px;
           margin:20px 0;
           color:#686f7a ">
          You have requested to reset your password for MoreRecipes account.
          Please click on this <a style="color: #ff4500"
          href='${req.protocol}://${req.headers.host}/auth/reset_password/${user.token}'>
          link</a> to reset password.
          <p style="color:black">If the above URL does not work,
          try copying and pasting it into your browser.
          If you continue to experience problems please feel free to contact us.
          </p>
        </p>
        <p style="
           padding-bottom:15px;
           margin-top:40px;
           color:#686f7a ">
          If you haven't made this request
          please ignore this email and your password would
          <strong>not</strong> be changed.
        </p>
        <p style="padding-bottom:10px;
           margin-top:20px;
           color:#ff4500; font-size: 20px ">
          More-recipes&reg; <br>
        </p>
      </div>
    </div>
  </div>`,

  reviewmailer: (reviewed, data, reviewOwner) => `
  <div>
    <div style="background-color:#f2f3f5 ;padding:20px">
      <div style="max-width:600px;margin:0 auto">
        <div style="
           background:#fff;
           font:14px sans-serif;
           color:#686f7a ;
           border:2px solid #ff4500 ;
           margin-bottom:10px">
          <div style="
            border-bottom:1px solid #f2f3f5 ;
            padding-bottom:20px;
            padding-top:20px">
            <h4 style="
               padding-top:0;
               padding-left:20px;
               margin:0;
               font-size:30px;
               font-family:'Kurale', serif; color: #ff4500">
              More Recipes</h4>
          </div>
          <div style="padding:10px 20px;line-height:1.5em;color:#686f7a ">
            <p style="
               padding-bottom:20px;
               margin:20px 0;
               color:#686f7a;">
              Hello, <span style="text-transform: capitalize; font-weight: bold">
              ${reviewed.User.username}<span>
            </p>
            <p style="
               padding-bottom:20px;
               margin:20px 0;
               color:#000000; font-size: 20px; margin: 0 auto">
               You have a new review!!
            </p>
            <p style="
            padding-bottom:20px;
            margin:20px 0;"><br /><span style="color: "black">${reviewOwner} said,
            </span><br /><br />
            <span style="border: 2px solid #ff4500;
            padding: 15px; margin-top: 105px; margin-right: 30px"> ${data} </span>
            <br /><br /> <br />about your ${reviewed.name}
            </p>

            <p style="padding-bottom:10px;
               margin-top:20px;
               color:#ff4500; font-size: 20px ">
              More-recipes&reg; <br>
            </p>
          </div>
        </div>
      </div>
  `
};
