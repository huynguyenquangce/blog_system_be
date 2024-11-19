import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (plainPassword: string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(plainPassword, salt);
    return hashPassword.toString();
  } catch (error) {
    console.log(error);
  }
};

export const comparePass = async (plainPassword: string, ValidPass: string) => {
  try {
    const isMatch = bcrypt.compare(plainPassword, ValidPass);
    return isMatch;
  } catch (error) {}
};
