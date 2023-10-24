"use client";

import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Theme accentColor="mint" grayColor="gray" panelBackground="solid" radius="full">
        {children}
      </Theme>
    </ThemeProvider>
  );
}
