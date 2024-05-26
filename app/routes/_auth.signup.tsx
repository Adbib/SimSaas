import type { MetaFunction } from "@remix-run/react";
import { Form, useActionData, useNavigation } from "@remix-run/react";

import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";

import { signupSchema } from "~/utils/schemas";
import { ZodError } from "zod";
import { createUser } from "~/services/models/users.db";
import { EMAIL_PASSWORD_STRATEGY, authenticator } from "~/services/auth.server";
import { siteConfigs } from "~/utils/brand/constant";
import MyButton from "~/components/MyButton";

export const meta: MetaFunction = () => [
  // your meta here
  {
    title: `${siteConfigs.siteTitle} - Signup`,
    description: "Signup page",
  },
];

export default function Signup() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  return (
    <Form method="post" className="space-y-5">
      {/** Your form elements here */}
      {actionData && "error" in actionData ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {"errors" in actionData ? (
            <ul className=" list-disc pl-3">
              {actionData?.errors.map((error) => (
                <li key={error.message}>{error.message}</li>
              ))}
            </ul>
          ) : null}
          {"message" in actionData ? (
            <span className="block sm:inline ">{actionData?.message}</span>
          ) : null}
        </div>
      ) : null}
      <div className="relative">
        <svg
          className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
          aria-hidden="true"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
      </div>
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
        {/* <button
          className=" bg-indigo-500 text-white p-5 px-20 font-medium rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          type="submit"
        >
          Signup
        </button> */}
        <MyButton
          type="submit"
          textValue="Signup"
          isLoading={navigation.state === "submitting"}
          loadingText="Wait..."
        />
      </div>
    </Form>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const requestClone = request.clone();
  const formData = await requestClone.formData();
  const body = Object.fromEntries(formData);
  try {
    const data = signupSchema.parse(body);
    const user = await createUser(data);
    if (!user) {
      return json(
        { error: true, message: "User not created" },
        { status: 400 }
      );
    }

    // return json({ user });
  } catch (error) {
    if (error instanceof ZodError) {
      return json({ error: true, errors: error.errors }, { status: 400 });
    }
    if (error instanceof Error) {
      return json({ error: true, message: error.message }, { status: 400 });
    }
  }

  return await authenticator.authenticate(EMAIL_PASSWORD_STRATEGY, request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    context: { formData },
  });
};
