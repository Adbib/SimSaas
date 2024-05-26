import type { MetaFunction } from "@remix-run/react";
import { Form, useActionData, useNavigation } from "@remix-run/react";

import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";

import { loginSchema } from "~/utils/schemas";
import { ZodError } from "zod";
import { EMAIL_PASSWORD_STRATEGY, authenticator } from "~/services/auth.server";
import { siteConfigs } from "~/utils/brand/constant";
import MyButton from "~/components/MyButton";

export const meta: MetaFunction = () => [
  // your meta here
  {
    title: `${siteConfigs.siteTitle} - Login`,
    description: "Login page",
  },
];

export default function Login() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  // console.log("actionData", actionData);
  return (
    <Form method="post" className="space-y-5">
      {/** Your form elements here */}
      <div className="relative">
        <svg
          className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <title> </title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
      </div>

      <div className="relative">
        <svg
          className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
          data-slot="icon"
          aria-hidden="true"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title> </title>
          <path
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <input
          // className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
      </div>
      <div className="relative text-center">
        <MyButton
          type="submit"
          textValue="Signin"
          isLoading={navigation.state === "submitting"}
          loadingText="Wait..."
        />
      </div>
    </Form>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  try {
    loginSchema.parse(Object.fromEntries(formData));
    return await authenticator.authenticate(EMAIL_PASSWORD_STRATEGY, request, {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      throwOnError: true,
      context: { formData },
    });
  } catch (error) {
    // console.log("error", error);sdfddgdfgjdfhbdfsd
    if (error instanceof Response) {
      return error;
    }
    if (error instanceof ZodError) {
      const message = error.errors.map((err) => err.message).join(", ");
      return json({ error: true, message }, { status: 400 });
    }
    if (error instanceof Error)
      return json({ error: true, message: error.message }, { status: 400 });
  }
  return null;
};
