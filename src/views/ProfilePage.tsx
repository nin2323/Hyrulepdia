import { ChestButton } from "../components/chest-button/ChestButton"
import './ProfilePage.css'

export const PorfilePage = () => {
    return (
        <div className="profile-page">
            <ChestButton rarity="rare" price={500} />
            <ChestButton rarity="common" price={500} />
            <ChestButton rarity="epic" price={500} />
        </div>
    )
}
