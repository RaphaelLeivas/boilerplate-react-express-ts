import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const hashPassword = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

const comparePassword = (password: string, hashPassword: string) =>
  bcrypt.compareSync(password, hashPassword);

const generateToken = (_id: string, username: string) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT secret is undefined!');
  }

  const token = jwt.sign({ _id, username }, jwtSecret, {
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  });

  return token;
};

export default {
  hashPassword,
  comparePassword,
  generateToken,
};
