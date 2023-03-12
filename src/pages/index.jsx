import Head from "next/head";
import Image from "next/image";

// Components

import Banner from "@/components/banner/banner.component";
import Card from "@/components/card/card.component";

import { fetchCoffeeStores } from "../../lib/coffee-stores";

// styles
import styles from "@/styles/Home.module.css";

export const getStaticProps = async (context) => {
    const data = await fetchCoffeeStores();

    return {
        props: {
            coffeeStore: data,
        },
    };
};

export default function Home(props) {
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
                                        key={store.fsq_id}
                                        className={styles.card}
                                        name={store.name}
                                        imgUrl={
                                            store.imgUrl ||
                                            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                        }
                                        href={`/coffee-store/${store.fsq_id}`}
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