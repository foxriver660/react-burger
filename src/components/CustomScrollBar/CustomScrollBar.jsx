import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import classes from './CustomScrollBar.module.css'

const CustomScrollBar = ({ children, ...props }) => {
const [state, setState] = React.useState(props.side)
  const scrollRef = React.useRef()
console.log(state)
  return (
    <Scrollbars
      renderThumbVertical={props => <div {...props} className={classes.trumb}/>}
      renderTrackVertical={props => <div {...props} className={(state === "right") ? classes.trackRight : classes.trackLeft}/>} 
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
