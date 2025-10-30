import { Poppins } from "next/font/google";
import "./globals.css";
import GhostCursorEffect from "@/components/ui/GhostCursor";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // choose only what you need
  variable: "--font-poppins", // register as CSS variable
  display: "swap", // prevents layout shift
});

export const metadata = {
  title: "Pratik | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        {children}
        <GhostCursorEffect />
      </body>
    </html>
  );
}
