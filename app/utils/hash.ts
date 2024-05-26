import bcrypt from "bcryptjs";

export async function hash(text: string) {
  return await bcrypt.hash(text, 10);
}
