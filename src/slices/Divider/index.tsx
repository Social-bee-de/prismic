'use client'
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for the Divider slice
 */
export type DividerSliceProps = SliceComponentProps<any>;

/**
 * Simple horizontal divider component that works with Prismic data
 */
const Divider: FC<DividerSliceProps> = ({ slice }) => {
  // Extract customization options from slice
  const {
    primary: {
      custom_padding = false,
      padding_mobile = "10",
      padding_desktop = "60",
      custom_color = false,
      color
    }
  } = slice;
  
  // Generate CSS classes and styles
  const paddingClasses = custom_padding 
    ? `px-[${padding_mobile}px] lg:px-[${padding_desktop}px]` 
    : "px-[10px] lg:px-[60px]";
  
  const colorStyle = custom_color && color 
    ? { backgroundColor: color } 
    : { backgroundColor: 'var(--border-primary)' };
  
  return (
    <div className={`${paddingClasses} h-[2px] w-screen`}>
      <hr className="w-full h-full" style={colorStyle}></hr>
    </div>
  );
};

export default Divider;