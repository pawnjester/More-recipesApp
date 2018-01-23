import nodemailer from 'nodemailer';


const mailer = (name, reviewer, email, review, recipeName, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },

  });

  const mailOptions = {
    from: 'more-Recipes@andela.com',
    to: email,
    subject: 'You have a new review!!',
    html: `
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
						Hello, <span style="text-transform: capitalize; font-weight: bold">${name}<span>
          </p>
					<p style="
             padding-bottom:20px;
             margin:20px 0;
             color:#000000; font-size: 30px; margin: 0 auto">
             You have a new review!!
          </p>
          <p style="
          padding-bottom:20px;
          margin:20px 0;">
          <span style="text-transform: capitalize; font-weight: bold; color:#000000">${reviewer}</span> said, <br /><br /><br /><span style="border: 2px solid #ff4500; padding: 15px; margin-top: 105px; margin-right: 30px"> ${review} </span> <br /><br /> <br />about your ${recipeName}
          </p>

					<p style="padding-bottom:10px;
             margin-top:20px;
             color:#ff4500; font-size: 20px ">
						More-recipes&reg; <br>
					</p>
				</div>
			</div>
		</div>`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).json({ error: 'Unable to send mail' });
    }
    return res.status(200).json({ message: 'Recovery link sent to your mail' });
  });
};


export default mailer;
