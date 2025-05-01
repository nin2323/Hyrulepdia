import { Button } from "../components/button/button"
import '../index.css'
import '../styles/variables.css'
import '../components/button/button.css'
import { NavLink } from "react-router-dom"

export const HomePage = () => {
    return (
        <div>
            <Button color="outlined">Button Bigger</Button>
        </div>
    )
}