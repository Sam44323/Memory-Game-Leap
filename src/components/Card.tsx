import React from "react";
import styles from "../styles/Card.module.scss";
import ReactCardFlip from "react-card-flip";

const Card: React.FC<{
  content: string;
  index: number;
  flipState: boolean;
  flipHandler: (index: number) => void;
}> = (props) => {
  return (
    <div
      className={styles.CardContainer}
      onClick={() => props.flipHandler(props.index)}
    >
      <ReactCardFlip
        isFlipped={!props.flipState}
        flipDirection="horizontal"
        flipSpeedFrontToBack={0.6}
        containerClassName={styles.CardClass}
      >
        <div className={styles.front}>
          <p>{props.content}</p>
        </div>

        <div className={styles.back}></div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;
