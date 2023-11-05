import { ModeToggle } from "@/app/(components-navbar)/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import AuthStatus from "./(components-navbar)/auth-status";
import Navbar from "./(components-navbar)/navbar";
import PageHeader from "@/components/global/pageheader";
import "./globals.css";
import { Providers } from "./providers";

// conditional for catching the error, if logged in should be at top or side 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clinicName = "Your Clinic Name"; // replace with your clinic's name
  const activePatients = 100; // replace with your number of active patients

  return (
    <html lang="en" suppressHydrationWarning>
      {/* Hydration warning suppressed because of next-themes https://github.com/pacocoursey/next-themes */}
      <body>
        <Providers>
          <div className="flex">
            {/* Sidebar (Navbar) */}
            <div className="w- h-screen bg-white p-4 flex flex-col justify-between">
              <div className="flex-grow-1"></div>
                <Navbar />
              <div className="flex-grow-2"></div>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-4">
              <div className="flex items-center justify-end space-x-4 p-4">
                <ModeToggle />
                <AuthStatus />
              </div>
                <PageHeader clinicName={clinicName} activePatients={activePatients} />
              <div className="mt-16 p-4">{children}</div>
            </div>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
