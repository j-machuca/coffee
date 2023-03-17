import "@/styles/globals.css";

import { IBM_Plex_Sans } from "next/font/google";

import StoreProvider from "../../store/storeContext";

const IBMPlexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal", "italic"],
});

export default function App({ Component, pageProps }) {
    return (
        <main className={IBMPlexSans.className}>
            <StoreProvider>
                <Component {...pageProps} />
            </StoreProvider>
        </main>
    );
}
