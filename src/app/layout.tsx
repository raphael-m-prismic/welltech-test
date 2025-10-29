import "./globals.css"

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
// import Header from "@/components/Header/Header";
import { Search } from "@/components/Search/Search";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Header/> */}
        <Search/>
        {children}
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
