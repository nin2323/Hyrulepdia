import { CardContainer } from '../components/CardContainer/CardContainer';
import { UserProfileEditor } from '../components/firebase/user-profile/UserProfileEditor';
import { PoputContainer } from '../components/CardContainer/popup-container/poputContainer';

//<UserProfileEditor />
export const PorfilePage = () => {
  return (
    <div>
      <h1>Perfil</h1>
      <UserProfileEditor />

      <CardContainer colorClass='blue-theme' popUp={true}>
        <h1>Contenido brillante</h1>
      </CardContainer>

      <CardContainer colorClass='golden-theme' popUp={false}>
        <h1>Modo normal dorado</h1>
      </CardContainer>
    </div>
  );
};
