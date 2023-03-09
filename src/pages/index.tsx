import Head from "next/head";
import Image from "next/image";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { FC } from "react";

// Components

import Banner from "@/components/banner/banner.component";
import Card from "@/components/card/card.component";

// styles
import styles from "@/styles/Home.module.css";

// Data

import coffeeStoreData from "../../data/coffee-stores.json";

type CoffeStore = {
    id: number;
    name: string;
    imgUrl: string;
    websiteUrl: string;
    address: string;
    neighbourhood: string;
};

type PropType = {
    coffeeStore: CoffeStore[];
};

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            coffeeStore: coffeeStoreData,
        },
    };
};

export default function Home(props: PropType) {
    const { coffeeStore } = props;
    const handleOnBannerBtnClick = () => {
        console.log("Banner button had been clicked");
    };

    return (
        <>
            <Head>
                <title>Coffee Connoisseur</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Banner
                    buttonText="View stores nearby"
                    handleOnClick={handleOnBannerBtnClick}
                />
                <Image
                    className={styles.heroImage}
                    src="/static/img/hero-image.png"
                    alt="Sitting drinking cofee"
                    width={700}
                    height={400}
                />
                {coffeeStore.length > 0 && (
                    <>
                        <h2 className={styles.heading2}>Toronto Stores</h2>
                        <div className={styles.cardLayout}>
                            {coffeeStore.map((store) => {
                                return (
                                    <Card
                                        key={store.id}
                                        className={styles.card}
                                        name={store.name}
                                        imgUrl={store.imgUrl}
                                        href={`/coffee-store/${store.id}`}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </main>
        </>
    );
}
