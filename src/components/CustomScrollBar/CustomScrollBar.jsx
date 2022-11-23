import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

const CustomScrollBar = ({ children, ...props }) => {
  const renderThumb = ({ ...props }) => {
    const thumbStyle = {
      backgroundColor: `#8585AD`,
      width: 8,
    };
    return <div style={{ ...thumbStyle }} />;
  };

  return (
    <Scrollbars
      renderThumbVertical={renderThumb}
     
      autoHeight={true}
      autoHeightMax={800}
      style={{ width: 600 }}
    >
      {children}
    </Scrollbars>
  );
};
export default CustomScrollBar;
