import React from "react";
import classes from './ImageCicle.module.css'
const ImageCicle = ({src}) => {
  return (
    <div className={classes.imgContainer}>
      <img
        className={classes.img}
        src={src}
        alt=""
      />
    </div>
  );
};

export default ImageCicle;
