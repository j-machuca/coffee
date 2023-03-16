import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styles from "./coffeeStore.module.css";
import cls from "classnames";

import Image from "next/image";

import { fetchCoffeeStores } from "../../../lib/coffee-stores";

export async function getStaticProps(staticProps) {
    const params = staticProps.params;

    const data = await fetchCoffeeStores();

    const findCoffeeStoreById = data.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //dynamic id
    });

    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
        },
    };
}

export async function getStaticPaths() {
    const data = await fetchCoffeeStores();

    const paths = data.map((coffeeStore) => {
        return { params: { id: coffeeStore.id.toString() } };
    });

    return {
        paths,
        fallback: true,
    };
}

const CoffeeStoreDetail = (props) => {
    const router = useRouter();
    const { id } = router.query;

    if (router.isFallback) {
        return <div>Loading</div>;
    }

    const { name, address, locality, imgUrl } = props.coffeeStore;

    const handleUpvoteButton = () => {
        console.log("handle upvote");
    };

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link className="" href="/">
                            ← Back to home page
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        className={styles.storeImg}
                        src={
                            imgUrl ||
                            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                        }
                        alt={name}
                        width={480}
                        height={300}
                    />
                </div>
                <div className={cls("glass", styles.col2)}>
                    {address && (
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/static/img/places.svg"
                                width={24}
                                height={24}
                                alt="icon"
                            />
                            <p className={styles.text}>{address}</p>
                        </div>
                    )}

                    {locality && (
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/static/img/nearMe.svg"
                                width={24}
                                height={24}
                                alt="icon"
                            />
                            <p className={styles.text}>{locality}</p>
                        </div>
                    )}

                    <div className={styles.iconWrapper}>
                        <Image
                            src="/static/img/star.svg"
                            width={24}
                            height={24}
                            alt="icon"
                        />
                        <p className={styles.text}>{1}</p>
                    </div>
                    <button
                        className={styles.upvoteButton}
                        onClick={handleUpvoteButton}
                    >
                        Upvote
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeStoreDetail;
