import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import classes from "./CustomScrollBar.module.css";
import PropTypes from "prop-types";

const AUTO_HEIGHT_MAX = 800;
const ENABLE_AUTO_HEIGHT = true;

const CustomScrollBar = (props) => {
  return (
    <Scrollbars
      renderThumbVertical={(props) => (
        <div {...props} className={classes.trumb} />
      )}
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          className={
            props.side === "right" ? classes.trackRight : classes.trackLeft
          }
          style={{
            ...style,
            width: "8px",
          }}
        />
      )} 
      autoHeight={ENABLE_AUTO_HEIGHT}
      autoHeightMax={AUTO_HEIGHT_MAX}
      className="box"
    >
      {props.children}
    </Scrollbars>
  );
};
export default CustomScrollBar;

CustomScrollBar.propTypes = {
  children: PropTypes.node,
};
