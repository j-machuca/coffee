import "@/styles/globals.css";

import { IBM_Plex_Sans } from "next/font/google";
import { createContext, useContext, useReducer } from "react";

export const StoreContext = createContext();

export const ACTION_TYPES = {
    SET_LAT_LNG: "SET_LAT_LNG",
    SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LAT_LNG: {
            return { ...state, latLng: action.payload.latLng };
        }
        case ACTION_TYPES.SET_COFFEE_STORES: {
            return { ...state, coffeeStores: action.payload.coffeeStores };
        }
        default:
            throw Error(`Unhandled action type:${action.type} `);
    }
};

const IBMPlexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal", "italic"],
});

const StoreProvider = ({ children }) => {
    const initialState = { latLng: "", coffeeStores: [] };
    const [state, dispatch] = useReducer(storeReducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export default function App({ Component, pageProps }) {
    return (
        <main className={IBMPlexSans.className}>
            <StoreProvider>
                <Component {...pageProps} />
            </StoreProvider>
        </main>
    );
}
