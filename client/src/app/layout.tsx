import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
