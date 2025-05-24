/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable react/no-unescaped-entities */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        {/* <meta name="description" ... /> <-- Hapus baris ini */}
        <link rel="icon" href="/boy.png" />
      </Head>
      <body className="antialiased bg-gradient-to-r from-blues to-slate-100 dark:from-slate-950 dark:to-slate-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
