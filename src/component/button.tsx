import { ReactNode } from "react";
import './button.css'

interface ButtonProps {
    children?: ReactNode;
    color?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean; 
    onClick?: () => void;
}

export const  Button = (props: ButtonProps) =>{
   const {onClick, color, children, disabled, size} = props;

   const buttonClass = `button ${color} ${size} ${disabled ? 'disabled' : ''}`;
   
    return (
        <div>
            <button onClick={onClick} disabled={disabled} className={buttonClass}>
                <svg className="button-corner" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 15L9.53674e-07 -7.49338e-07L15 0L15 15ZM8.48214 6.51786L14.1071 6.51786L8.48214 0.892857L8.48214 6.51786Z" fill="#BAEFFB"/>
                </svg>
                <div className="button-content">
                    {children}
                </div>
            </button>
        </div>
    )
}