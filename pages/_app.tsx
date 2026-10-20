import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { CartProvider } from "@/components/CartProvider";
import { GlobalHeader } from "@/components/GlobalHeader";
import { GlobalFooter } from "@/components/GlobalFooter";
import { CartDrawer } from "@/components/CartDrawer";
import "@/styles/globals.css";
const inter = localFont({
  src: "../public/fonts/inter-variable.woff2",
  display: "swap",
  variable: "--font-inter",
});
const space = localFont({
  src: [
    { path: "../public/fonts/space-grotesk-400.ttf", weight: "400" },
    { path: "../public/fonts/space-grotesk-500.ttf", weight: "500" },
    { path: "../public/fonts/space-grotesk-600.ttf", weight: "600" },
    { path: "../public/fonts/space-grotesk-700.ttf", weight: "700" },
  ],
  display: "swap",
  variable: "--font-space",
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${inter.variable} ${space.variable} min-h-screen bg-white font-sans text-black`}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <a
        href="#main"
        className="sr-only z-[100] border border-white bg-black px-4 py-3 font-display text-xs uppercase text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <CartProvider>
        <GlobalHeader />
        <main id="main">
          <Component {...pageProps} />
        </main>
        <GlobalFooter />
        <CartDrawer />
      </CartProvider>
    </div>
  );
}
