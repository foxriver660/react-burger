import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import classes from "./CustomScrollBar.module.css";

const CustomScrollBar = ({ children, style, ...props }) => {
  const [state, setState] = React.useState(props.side);

  return (
    <Scrollbars
      renderThumbVertical={(props) => (
        <div {...props} className={classes.trumb}/>
      )}
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          className={state === "right" ? classes.trackRight : classes.trackLeft}
          style={{
            ...style,
            width: "8px",
          }}
        />
      )}
      autoHeight={true}
      autoHeightMax={800}
      className="box"
    >
      {children}
    </Scrollbars>
  );
};
export default CustomScrollBar;
