import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type CardProps = {
    name: string;
    imgUrl: string;
    href: string;
};

const Card: FC<CardProps> = (props) => {
    return (
        <Link href={props.href}>
            <h2>{props.name}</h2>
            <Image
                src={props.imgUrl}
                width={260}
                height={160}
                alt={props.name}
            />
        </Link>
    );
};

export default Card;
