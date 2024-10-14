import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Wrapper from "./Wrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Messenger App | Secure & Fast Messaging Platform",
  description:
    "Experience seamless communication with our Messenger app. Send messages, share media, and connect with friends and family instantly. Secure, fast, and user-friendly.",
  keywords:
    "messenger, messaging app, instant messaging, chat application, secure messaging, communication platform",
  openGraph: {
    title: "Messenger App | Connect Instantly",
    description:
      "Send messages, share media, and stay connected with our fast and secure Messenger app.",
    type: "website",
    url: "https://yourmessengerapp.com",
    // images: [
    //   {
    //     url: "https://yourmessengerapp.com/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Messenger App Preview",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Messenger App | Connect Instantly",
    description:
      "Send messages, share media, and stay connected with our fast and secure Messenger app.",
    // images: ["https://yourmessengerapp.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  // alternates: {
  //   languages: {
  //     'en-US': 'https://yourmessengerapp.com/en-US',
  //     'es-ES': 'https://yourmessengerapp.com/es-ES',
  //   },
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} font-Space_Grotesk ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Wrapper>
            <Toaster />
            <Navbar />
            {children}
            <Footer />
          </Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
