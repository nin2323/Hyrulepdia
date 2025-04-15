import { NavLink } from "react-router-dom"
import "./header.css"
import rupia from '../assets/rupia-icon.png'


export const Header = ()=> {
    return (
        <header>
            <span className="top-line-left"></span>
            <span className="top-line-right"></span>
            <span className="bottom-line-left"></span>
            <span className="bottom-line-right"></span>

            <span className="right-line-top"></span>
            <span className="right-line-bottom"></span>
                <div>
                    <NavLink className={"header-logo"} to="/">HYRULEPEDIA</NavLink>
                </div>
                <div className="header-content">
                    <nav className="header-nav">
                        <NavLink to="/shop">Tienda</NavLink>
                        <NavLink to="/collection">Colección</NavLink>
                        <NavLink to="/profile">Perfil</NavLink>
                    </nav>
                    <div className="user-money">
                        <p>1,000</p><img src={rupia} alt="" />  {/*habra que cambiarlo para que sea dinamico segun las rupias del usuario*/}
                    </div>
                </div>
        </header>  
    )
};