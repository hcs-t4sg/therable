import { TypographyH2, TypographyP } from "@/components/ui/typography";

export default function Home() {
  return (
    <>
      <TypographyH2>Welcome to team Therable!</TypographyH2>
      <TypographyP>If you&apos;re seeing this, your setup has (most likely) gone well!</TypographyP>
      <TypographyP>
        This starter project is styled with Tailwind CSS and uses shadcn/ui as a component library. Things should feel
        familiar, this is what your deliverable (if you&apos;re new here) was built on!
      </TypographyP>
      <TypographyP>
        This page is an unprotected route accessible to anyone who visits the website. Log in to view authenticated
        routes!
      </TypographyP>
    </>
  );
}
