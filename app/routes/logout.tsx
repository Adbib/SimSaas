import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.logout(request, { redirectTo: "/login" });
};

export default function RouteComponent() {
  return <div />;
}
