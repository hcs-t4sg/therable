import { cn } from "@/lib/utils";
import Link from "next/link";
import { getUserType } from "../../lib/server-utils";

export default async function Navbar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const userType = await getUserType();

  const isPatientUser = userType == "patient";

  const navigationLinks = [
    { href: "/", text: "Home" },
    { href: "/dashboard", text: "Dashboard" },
    { href: isPatientUser ? "/journal" : "/my-patients", text: isPatientUser ? "Journal" : "My patients" },
    { href: isPatientUser ? "/my-plan" : "/records", text: isPatientUser ? "My Plan" : "Records" },
    { href: "/messages", text: "Messages" },
  ];

  return (
    <nav className={cn("flex flex-col space-y-4 pl-10 lg:space-y-6", className)} {...props}>
      {navigationLinks.map((link) => (
        <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
          {link.text}
        </Link>
      ))}
    </nav>
  );
}
