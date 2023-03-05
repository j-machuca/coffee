import { FC } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const CoffeeStoreDetail: FC = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <title>Coffee store {id}</title>
            </Head>
            <div>Coffee Store Detail {id}</div>
            <Link href="/">Back to home page</Link>
        </>
    );
};

export default CoffeeStoreDetail;
