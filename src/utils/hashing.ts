import { hash } from 'bcrypt';
const saltRounds = 10;

export const hashString = async (str: string) => {
  const dataHash = await hash(str, saltRounds);
  return dataHash;
}