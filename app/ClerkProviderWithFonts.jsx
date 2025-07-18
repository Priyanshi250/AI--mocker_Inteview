"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export default function ClerkProviderWithFonts({ children }) {
  return (
    <ClerkProvider
      appearance={{
        signIn: {
          baseTheme: undefined,
        },
      }}
    >
      <div className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {children}
      </div>
    </ClerkProvider>
  );
} 