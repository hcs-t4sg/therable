import { createServerSupabaseClient } from "@/lib/server-utils";
import { Toaster } from "@/components/ui/toaster";
import AuthStatus from "./(components-navbar)/auth-status";
import Navbar from "./(components-navbar)/navbar";
import PageHeader from "@/components/global/pageheader";
import "./globals.css";
import { Providers } from "./providers";
import { getUserType } from "../lib/server-utils"


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  {/* Conditional rendering based on session */}
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let clinicName = "Clinic Unavailable";
  let activePatients = null;
  if (session) {
    // get clinic owner clinic
    if (await getUserType() == "clinician") {
      const clinics = session ? await supabase.from("clinicians").select("*,clinics(name,id)").eq("user_id", session.user.id).single() : null;
      if (clinics?.data?.clinics[0]) {
        clinicName = clinics.data.clinics[0].name
      }
      const {count} = (await supabase.from("clinic_members").select('*', {count: 'exact', head: true}).eq("clinic_id", clinics?.data?.clinics[0]?.id))
      activePatients = count
  }
  }
  // we have clinicians without clinics and patients without clinics

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className={`min-h-screen bg-white flex ${session ? 'flex-row' : 'flex-col'}`}>
            {session && (<div className="flex flex-col w-full max-w-xs h-screen border-r border-gray-300">
                <>
                  <div className="flex-grow-1"></div>
                  <Navbar />
                  <div className="flex-grow">
                  </div>
                </>

            </div>
            )}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-end p-4">
                <AuthStatus />
              </div>
              {session && (
                <div className="w-full">
                  <PageHeader clinicName={clinicName} activePatients={activePatients} />
                </div>
              )}
              <div className="overflow-auto p-4 flex-1"> {/* Scrollable page content */}
                {children}
              </div>
            </div>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
