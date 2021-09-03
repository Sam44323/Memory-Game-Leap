import React from "react";
import styles from "../styles/Card.module.scss";
import ReactCardFlip from "react-card-flip";

const Card: React.FC<{
  content: string;
}> = (props) => {
  return (
    <div className={styles.CardContainer}>
      <ReactCardFlip
        isFlipped={false}
        flipDirection="horizontal"
        flipSpeedFrontToBack={0.6}
        containerClassName={styles.CardClass}
      >
        <div className={styles.front}>{props.content}</div>

        <div className={styles.back}></div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;
