import React from "react";
import classes from './ImageCicle.module.css'
const ImageCicle = () => {
  return (
    <div className={classes.imgContainer}>
      <img
        className={classes.img}
        src="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
        alt=""
      />
    </div>
  );
};

export default ImageCicle;
