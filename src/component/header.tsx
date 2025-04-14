import { NavLink } from "react-router-dom"
import "./header.css"
import rupia from '../assets/rupia-icon.png'


export const Header = ()=> {
    return (
        <header>
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
                    <p>1000</p><img src={rupia} alt="" />
                </div>
            </div>
        </header>  
    )
};