import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styles from "./coffeeStore.module.css";
import cls from "classnames";

import coffeeStoreData from "../../../data/coffee-stores.json";
import Image from "next/image";

export async function getStaticProps(staticProps) {
    const params = staticProps.params;

    return {
        props: {
            coffeeStore: coffeeStoreData.find((coffeeStore) => {
                return coffeeStore.id.toString() === params.id; //dynamic id
            }),
        },
    };
}

export function getStaticPaths() {
    const paths = coffeeStoreData.map((coffeeStore) => {
        return { params: { id: coffeeStore.id.toString() } };
    });

    return {
        paths,
        fallback: false,
    };
}

const CoffeeStoreDetail = (props) => {
    const router = useRouter();
    const { id } = router.query;

    if (router.isFallback) {
        return <div>Loading</div>;
    }

    const { name, address, neighbourhood, imgUrl } = props.coffeeStore;

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
                            Back to home page
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        className={styles.storeImg}
                        src={imgUrl}
                        alt={name}
                        width={480}
                        height={300}
                    />
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/static/img/places.svg"
                            width={24}
                            height={24}
                            alt="icon"
                        />
                        <p className={styles.text}>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/static/img/nearMe.svg"
                            width={24}
                            height={24}
                            alt="icon"
                        />
                        <p className={styles.text}>{neighbourhood}</p>
                    </div>
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
