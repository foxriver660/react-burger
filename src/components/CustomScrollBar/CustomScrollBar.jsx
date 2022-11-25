import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import classes from './CustomScrollBar.module.css'

const CustomScrollBar = ({ children, ...props }) => {

  const scrollRef = React.useRef()
console.log(scrollRef)
  return (
    <Scrollbars
      renderThumbVertical={props => <div {...props} className={classes.trumb}/>}
      renderTrackVertical={props => <div {...props} className={classes.track}/>} 
      autoHeight={true}
      autoHeightMax={800}
      className='box'
     ref={scrollRef}
    >
      {children}
    </Scrollbars>
  );
};
export default CustomScrollBar;
