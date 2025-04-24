import { NavLink } from "react-router-dom"
import "./header.css"
import rupia from '../../assets/rupia-icon.png'


export const Header = ()=> {
    return (
        <header>
                <div>
                    <NavLink className={"header-logo"} to="/">HYRULEPEDIA</NavLink>
                </div>
                <div className="header-content">
                    <nav className="header-nav">
                        <NavLink to="/shop">STORE</NavLink>
                        <NavLink to="/collection">COLLECTION</NavLink>
                        <NavLink to="/profile">PROFILE</NavLink>
                    </nav>
                    <div className="user-money">
                        <p>1,000</p><img src={rupia} alt="" />  {/*habra que cambiarlo para que sea dinamico segun las rupias del usuario*/}
                    </div>
                </div>
        </header>  
    )
};