import type { User } from "@prisma/client";
import { json, redirect } from "@remix-run/node";
import { Authenticator } from "remix-auth";
import bcrypt from "bcryptjs";

import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import { loginSchema } from "~/utils/schemas";
import { prisma } from "~/utils/prisma.server";

export const EMAIL_PASSWORD_STRATEGY = "email-password-strategy";
// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session

type UserRet = Omit<User, "password">;
export const authenticator = new Authenticator<UserRet>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ context }) => {
    if (!context?.formData) {
      throw new Error("FormData must be provided in the Context");
    }

    const formData = context.formData as FormData;
    const email = formData.get("email") as string;
    const pass = formData.get("password") as string;

    const { password, ...checkedUser } = (await login({
      email,
      password: pass,
    })) as User;
    return checkedUser;
  }),
  EMAIL_PASSWORD_STRATEGY
);

/**
 * Utilities.
 */

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User not found");
    //   return { error: true, message: "User not found" };
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    // return { error: true, message: "Invalid password" };
    throw new Error("Invalid password");
  }

  return user;
}

export async function requireSessionUser(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {}
) {
  const sessionUser = await authenticator.isAuthenticated(request);
  if (!sessionUser) {
    if (!redirectTo) throw redirect("/");
    throw redirect(redirectTo);
  }
  return sessionUser;
}

export async function requireUser(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {}
) {
  const sessionUser = await authenticator.isAuthenticated(request);
  const user = sessionUser?.id
    ? await prisma.user.findUnique({
        where: { id: sessionUser?.id },
        //   include: {
        //     image: { select: { id: true } },
        //     roles: { select: { name: true } },
        //   },
      })
    : null;
  if (!user) {
    if (!redirectTo) throw redirect("/");
    throw redirect(redirectTo);
  }
  return user;
}
