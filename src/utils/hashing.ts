import { compareSync, hash } from 'bcrypt';
const saltRounds = 10;

export const hashString = async (str: string) => {
  const dataHash = await hash(str, saltRounds);
  return dataHash;
}

export const comparePassword = (password: string, hash: string) => {
  return compareSync(password, hash);
};