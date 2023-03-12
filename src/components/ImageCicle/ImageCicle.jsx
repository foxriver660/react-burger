import React from "react";
import classes from "./ImageCicle.module.css";
import PropTypes from "prop-types";
const ImageCicle = React.memo(({ src, ...props }) => {
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
      {index === 5 && rest > 0 && (
        <div className={`${classes.lastImg} text text_type_main-small`}>
          +{rest}
        </div>
      )}
    </div>
  );
});
ImageCicle.propTypes = {
  src: PropTypes.string.isRequired,
};
export default ImageCicle;
