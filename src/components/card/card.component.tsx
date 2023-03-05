import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import cls from "classnames";
import styles from "./card.module.css";

type CardProps = {
  name: string;
  imgUrl: string;
  href: string;
};

const Card: FC<CardProps> = (props) => {
  return (
    <div className={cls("glass", styles.container)}>
      <Link className={styles.cardLink} href={props.href}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{props.name}</h2>
        </div>
        <div className={styles.classImageWrapper}>
          <Image
            className={styles.cardImage}
            src={props.imgUrl}
            width={260}
            height={160}
            alt={props.name}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card;
