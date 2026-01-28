import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "業務用エアコン専門店比較ナビ",
  description: "人気の業務用エアコン専門店をランキング形式で徹底的に比較しました。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
