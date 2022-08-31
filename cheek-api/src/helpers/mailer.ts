import * as nodemailer from 'nodemailer';

const sendMail = (email: string, accessToken: string) => {
  const transport = nodemailer.createTransport({
    // service: 'Gmail',
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      // user: 'cheekbrand@gmail.com',
      //pass: 'ionjtcytoufzbtzs',
      user: 'faustino81@ethereal.email',
      pass: 'cujxME1vU72cGGbjFH',
    },
  });

  const mailOptions = {
    from: 'cheekbrand@gmail.com',
    to: email,
    subject: "Email de confirmation d'inscription",
    html: `<h1>Email de confirmation d'inscription.</h1>
        <h2>Bonjour</h2>
        <p>Merci pour votre inscription au site Cheek-Paris.com.
        Veuillez confirmer votre email en cliquant sur le lien suivant.</p>
        <a href="${process.env.APP_URL}/mailer/confirm/${accessToken}">Envoyer</a>`,
  };

  transport.sendMail(mailOptions, (err: Error, info) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log(info);
      return info;
    }
  });
};

export default sendMail;
