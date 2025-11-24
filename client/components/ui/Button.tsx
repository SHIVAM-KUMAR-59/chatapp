import React from 'react'

interface ButtonProps {
    text: string;
    onClick?: () => void;
    classname?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ text, onClick, classname, icon, disabled, type}) => {
  return (
    <button type={type} disabled={disabled} className={`bg-black/80 hover:bg-black/70 transition-all duration-200 text-white py-2 px-4 rounded flex items-center justify-center gap-1 ${classname}`} onClick={onClick}>{text} {icon}</button>
  )
}

export default Button