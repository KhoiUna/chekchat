const nodemailer = require("nodemailer");

module.exports = async ({ id, email }) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `ChekChat <${process.env.MAIL_USERNAME}>`,
      to: email,
      subject: "Hello from ChekChat",
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
            rel="stylesheet"
          />
      
          <style>
            * {
              font-family: "Lato", sans-serif;
            }
      
            html,
            body {
              padding: 0;
              margin: 0;
              background-color: #f7f7f7;
            }
      
            .container {
              text-align: center;
              background-color: #f7f7f7;
              width: 700px;
              margin: 0 auto;
            }
      
            header {
              margin: 0 auto;
              margin-bottom: 20px;
            }
      
            .email_confirmation .email_heading {
              margin: 0 auto;
            }
      
            .email_confirmation .email_container {
              margin: 0 auto;
              width: 90%;
              background-color: #fff;
              padding: 1.6rem;
            }
      
            .email_confirmation .email_container h1 {
              margin: 0;
            }
      
            .email_confirmation .email_container .email_text {
              text-align: left;
              font-size: 1rem;
              line-height: 1.5rem;
            }
      
            .email_confirmation .email_container .sending_code {
              background-color: #d0cece;
              padding: 0.9rem;
            }
      
            .email_confirmation .email_container .sending_code a {
              font-weight: bold;
              font-size: 1rem;
            }
      
            .copyright {
              font-weight: bold;
              font-size: 1rem;
            }
          </style>
        </head>
      
        <body>
          <div class="container">
            <header class="title">
              <a
                href="https://www.chekchat.xyz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="30%"
                  src="https://ik.imagekit.io/chekchat/chekchat_logo_IBz25iGft.png?updatedAt=1635374191924"
                  alt="ChekChat logo"
                />
              </a>
            </header>
      
            <div class="email_confirmation">
              <div class="email_container">
                <h1>Welcome to ChekChat!</h1>
      
                <p style="font-weight: bold; text-align: left; font-size: 1rem">
                  Hello there!
                </p>
                <p class="email_text">
                  Thank you for signing up for ChekChat. This is your final step to
                  get access to ChekChat! Below is a link to our survey. Click &
                  answer it to be a part of ChekChat!
                </p>
      
                <div class="sending_code">
                  <a
                    href="https://survey.chekchat.xyz?id=${id}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Link to our survey</a
                  >
                </div>
      
                <p class="email_text">
                  Thank you so much! Wish you could have an amazing journey with us.
                </p>
      
                <footer>
                  <div class="copyright">&copy; ChekChat</div>
                </footer>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
    });

    console.log("Email sent!");

    return true;
  } catch (err) {
    console.error("Error sending survey");
    return;
  }
};
