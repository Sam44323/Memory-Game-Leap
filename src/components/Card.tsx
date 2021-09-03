import React, { useEffect, useState } from "react";
import { useSpring, animated as a } from "react-spring";

const Card: React.FC<any> = ({
  id,
  color,
  game,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes,
}) => {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useEffect(() => {
    console.log("Flipped Indexes Changed");
  }, [flippedIndexes]);

  const onCardClick = () => {
    console.log("Card Clicked");
    set((state) => state);
  };

  return (
    <div onClick={onCardClick}>
      <a.div
        className="c back"
        style={{
          opacity: opacity.interpolate((o) => 1 - o),
          transform,
        }}
      />
      <a.div
        className="c front"
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
          background: color,
        }}
      />
    </div>
  );
};

export default Card;
