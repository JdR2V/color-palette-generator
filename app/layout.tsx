import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { themeScript } from "@/lib/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Color Palette Generator",
  description:
    "Generate harmonious color palettes using color theory. Export to CSS, Tailwind, SCSS, and JSON tokens.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Flash prevention — runs before React */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Spicy+Rice&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;800&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
