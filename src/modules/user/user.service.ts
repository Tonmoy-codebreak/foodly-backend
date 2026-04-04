import z, { email } from "zod";
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { error } from "console";

// eikhane amar schema----------------------------------------------
export const createUserSchema = z.object({
  name: z.string().min(1, "Enter your name"),
  email: z.string().email("Invalid Mail"),
  password: z.string().min(8, "Your password must contain minimum 8 letter"),
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(1, "Password is required"),
});

// eikhane amar type infer----------------------------------------------------
export type CreatedUserInputs = z.infer<typeof createUserSchema>;
export type LoginUserInputs = z.infer<typeof loginUserSchema>;

// ekhane amar logic------------------------------------------------------------
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

export const loginNewUser = async (data: LoginUserInputs) => {
  const parseData = loginUserSchema.parse(data);
  const { email, password } = parseData;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("User Not Found");
  }

  const passwordMatching = await bcrypt.compare(password, user.password);

  if (!passwordMatching) {
    throw new Error("Password is wrong");
  }

  const { password: _password, role: _role, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
