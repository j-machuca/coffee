import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { IBM_Plex_Sans } from "next/font/google";

const IBMPlexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal", "italic"],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={IBMPlexSans.className}>
            <Component {...pageProps} />
        </main>
    );
}
