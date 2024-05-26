import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";
import { authenticator } from "~/services/auth.server";
import { siteConfigs } from "~/utils/brand/constant";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    // successRedirect: "/dashboard",
    failureRedirect: "/login",
  });
}

export const meta: MetaFunction = () => [
  // your meta here
  {
    title: `${siteConfigs.siteTitle} - Dashboard`,
    description: "Login page",
  },
];
