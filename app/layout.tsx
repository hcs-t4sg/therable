import { ModeToggle } from "@/app/(components-navbar)/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import AuthStatus from "./(components-navbar)/auth-status";
import Navbar from "./(components-navbar)/navbar";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "T4SG Starter Project",
  description: "T4SG starter project 2023. Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Hydration warning suppressed because of next-themes https://github.com/pacocoursey/next-themes */}
      <body>
        <Theme>
          <Providers>
            <div className="flex-col md:flex">
              <div className="border-b">
                <div className="flex h-16 items-center px-4">
                  <Navbar className="mx-6" />
                  <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <AuthStatus />
                  </div>
                </div>
              </div>
              {/* Conditionally display website if logged in, else display login page */}
              {/* <div className="flex-1 space-y-4 p-8 pt-6"> */}
              <div className="space-y-6 p-10 pb-16 md:block">
                <main>{children}</main>
              </div>
              {/* </div> */}
            </div>
          </Providers>
          <Toaster />
        </Theme>
      </body>
    </html>
  );
}
