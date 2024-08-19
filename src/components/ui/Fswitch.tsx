import React from 'react';
import { motion } from 'framer-motion';
import "./styles.css";

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

const Fswitch = React.forwardRef<HTMLDivElement, any>(
  ({ ...props }, ref) => {
    
  const { checked, onCheckedChange, className, ...restProps } = props;


  const toggleSwitch = () => onCheckedChange(!checked);

  return (
    <div className={`switch1 peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed 
    disabled:opacity-50 ${checked ? 'bg-primary' : 'bg-input'} ${className}`} 
    onClick={toggleSwitch} ref={ref} {...restProps}>
      <motion.div 
        className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0" 
        layout 
        transition={spring} 
        animate={{ x: checked  ? 10 : -10 }}  // Aquí animas la posición en función del estado
      />
    </div>
  );
}
);
export {Fswitch};