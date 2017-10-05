/* eslint-disable */


export const validateLength = (req, res, next) => {
  if (!req.body.username) {
      return res.status(400).send({ error: 'You need to fill in your username' });
  }
  if(req.body.username.length < 6){
    return res.status(400).send({error: 'username length is too short, min:6'});
  }
  if (req.body.password.length < 6) {
    return res.status(400).send({error: 'password length is too short, min:6'})
  }
  next();
}

// export default validateLength;