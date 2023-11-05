import { createServerSupabaseClient } from "@/lib/server-utils";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { LogOut, Settings } from "lucide-react"; // Import icons
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { type Database } from "@/lib/schema";
import { getUserType } from "../../lib/server-utils"

export default async function Navbar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  // Create supabase server component client and obtain user session from stored cookie
  // const supabaseClient = createClientComponentClient<Database>();
  const supabase = createServerSupabaseClient();

  const userType = await getUserType ()
  // const handleSignOut = async () => {
  //   await supabaseClient.auth.signOut();
  // };

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // const navigationLinks = [
  //   { href: "/", text: "Home" },
  //   { href: "/dashboard", text: "Dashboard" },
  //   { href: "/messages", text: "Messages" },
  //   { href: "/my-patients", text: "My patients" },
  //   { href: "/records", text: "Records" },
  // ];

  // If a user is signed in as a patient, you can replace "My patients" with "Journal", and replace "Records" with "My plan"
  const isPatientUser = (userType == "patient") /* replace this with your user type checking logic */;

  const navigationLinks = [
    { href: "/", text: "Home" },
    { href: "/dashboard", text: "Dashboard" },
    { href: isPatientUser ? "/journal" : "/my-patients", text: isPatientUser ? "Journal" : "My patients" },
    { href: isPatientUser ? "/my-plan" : "/records", text: isPatientUser ? "My Plan" : "Records" },
    { href: "/messages", text: "Messages" },
  ];

  return (
    <nav className={cn("flex flex-col space-y-4 lg:space-y-6", className)} {...props}>
      {navigationLinks.map((link) => (
        <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
          {link.text}
        </Link>
      ))}

      {session && (
        <>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
          {/* <button onClick={void handleSignOut} className="absolute bottom-5 left-6 text-sm font-medium transition-colors hover:text-primary">
            <LogOut className="inline-block h-5 w-5 mr-2" /> Log Out
          </button>
          <Link href="/settings" className="absolute bottom-12 left-6 text-sm font-medium transition-colors hover:text-primary">
            <Settings className="inline-block h-5 w-5 mr-2" /> Settings
          </Link> */}
        </>
      )}
    </nav>
  );
}
