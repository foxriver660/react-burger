import React, { FC } from "react";
import classes from "./ImageCicle.module.css";
import { TImageCicle } from "../../services/types";

const ImageCicle: FC<TImageCicle> = React.memo(({ src, ...props }) => {
  const { index, rest } = props;

  const zIndex =
    index === 0
      ? 5
      : index === 1
      ? 4
      : index === 2
      ? 3
      : index === 3
      ? 2
      : index === 4
      ? 1
      : index === 5
      ? 0
      : 0;
  return (
    <div className={classes.imgContainer} style={{ zIndex: `${zIndex}` }}>
      <img className={classes.img} src={src} alt="Изорбажение ингредиента" />
      {index === 5 && (
        <div className={`${classes.lastImg} text text_type_main-small`}>
          +{rest}
        </div>
      )}
    </div>
  );
});

export default ImageCicle;
// TODO: this
