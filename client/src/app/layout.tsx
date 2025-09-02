import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import SessionProvider from "./providers/SessionProvider";

export const metadata: Metadata = {
  title: "Nerd-stud-io",
  description: "Nerd-stud-io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col gap-6 min-h-screen p-4 sm:p-5 lg:py-[30px] lg:px-[40px]">
        <SessionProvider>
          <Header />
          <Container>{children}</Container>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
