import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Therable",
  description: "Dev project Fall 2023",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="space-y-6 p-10 pb-16 md:block">
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
