import { Button } from "../component/button"
import '../index.css'
import '../styles/variables.css'
import '../component/button.css'
import { NavLink } from "react-router-dom"

export const HomePage = () => {
    return (
        <div>
            <Button size="lg">Button Bigger</Button>
            <Button>Button</Button>
            <Button component={NavLink} size="sm" to="/shop">Go to Store</Button>
        </div>
    )
}