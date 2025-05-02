import { ComponentType, ReactNode, ButtonHTMLAttributes, JSX } from "react";
import './button.css'
import classNames from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    color?: 'primary' | 'secondary' | 'error' | 'succes' | 'info' | 'warning' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean; 
    onClick?: () => void;
    className?: string; 
    component?: ComponentType<any> | keyof JSX.IntrinsicElements;
    to?: string;
    href?: string;
}


export const Button = ({
    onClick,
    color = 'primary',
    component = 'button',
    size = 'md',
    className = '',
    disabled,
    children,
    ...rest
}: ButtonProps) => {
    const buttonClass = classNames ({
        'button': true,
        [className]: className,
        [`${size}`]: size,
        [`${color}`]: color,
        disabled
    });

    const Component = component;
    return (
        <Component onClick={onClick} disabled={disabled} className={buttonClass} {...rest}>
            {color != 'outlined' ? (
             <>
            <svg className="button-corner" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15L9.53674e-07 -7.49338e-07L15 0L15 15ZM8.48214 6.51786L14.1071 6.51786L8.48214 0.892857L8.48214 6.51786Z" fill="currentColor" />
            </svg>
            <div className="button-content">
              {children}
            </div>
            </>
            ) : (
            <div>
                <span className="right-line-top"></span>
                <span className="right-line-bottom"></span>
                <span className="left-line-top"></span>
                <span className="left-line-bottom"></span>
                <span className="top-line-left"></span>
                <span className="bottom-line-left"></span>
                <span className="top-line-right"></span>
                <span className="bottom-line-right "></span>
                
                {children}
            </div>
            )}
        </Component>
    )
};