import z from "zod";
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { da } from "zod/v4/locales";

//im creating interface to check validation
// interface CreateUserInputs {
//   name: string;
//   email: string;
//   password: string;
// }

//creating zod schema to filter out bad upcoming input

export const createUserSchema = z.object({
  name: z.string().min(1, "Enter your name"),
  email: z.string().email("Invalid Mail"),
  password: z.string().min(8, "Your password must contain minimum 8 letter"),
});

export type CreatedUserInputs = z.infer<typeof createUserSchema>;

export const createNewUser = async (data: CreatedUserInputs) => {
  const parseData = createUserSchema.parse(data);

  const { name, email, password } = parseData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return result;
};
