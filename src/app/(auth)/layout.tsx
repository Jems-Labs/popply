import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${fredoka.variable} font-fredoka h-screen flex justify-center items-center`}>
      {children}
    </div>
  );
}
