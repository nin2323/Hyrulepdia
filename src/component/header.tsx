import { NavLink } from "react-router-dom"
import "./header.css"


export const Header = ()=> {
    return (
        <header>
            <div>
                <NavLink to="/">HYRULEPEDIA</NavLink>
            </div>
            <nav>
                <NavLink to="/shop">Tienda</NavLink>
                <NavLink to="/collection">Colección</NavLink>
                <NavLink to="/profile">Perfil</NavLink>
            </nav>
        </header>  
    )
};