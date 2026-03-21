import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Web3 Wallet Analyzer | Multi-Chain Crypto Portfolio Viewer",
    template: "%s | Web3 Wallet Analyzer",
  },

  description:
    "Analyze any crypto wallet across multiple chains. View token balances, portfolio value, and asset distribution using Next.js, viem, and Moralis.",

  keywords: [
    "Web3 wallet analyzer",
    "crypto wallet tracker",
    "multi-chain wallet viewer",
    "DeFi portfolio dashboard",
    "Ethereum wallet analyzer",
    "Polygon wallet tracker",
    "crypto portfolio analyzer",
    "Moralis API",
    "viem",
    "Next.js Web3 app",
    "blockchain analytics tool",
    "EVM wallet explorer",
  ],

  authors: [{ name: "Khalil Ahmed", url: "https://www.khalilahmed.dev" }],
  creator: "Khalil Ahmed",

  metadataBase: new URL("https://web3-wallet-analyzer.vercel.app/"),

  openGraph: {
    title: "Web3 Wallet Analyzer | Multi-Chain Crypto Portfolio Viewer",
    description:
      "Explore any wallet across Ethereum, Polygon, Base, Arbitrum, and BNB Chain. View token balances, portfolio value, and asset distribution in real-time.",
    url: "https://web3-wallet-analyzer.vercel.app/",
    siteName: "Web3 Wallet Analyzer",
    images: [
      {
        url: "/screenshots/dashboard.png",
        width: 1200,
        height: 630,
        alt: "Web3 Wallet Analyzer Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Web3 Wallet Analyzer",
    description:
      "Multi-chain wallet analyzer built with Next.js, viem, and Moralis. Analyze any wallet instantly.",
    images: ["/screenshots/dashboard.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
