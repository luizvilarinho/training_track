import Btn from "./Btn";
import Container from "./Container";
import { faHouse, faFire, faDumbbell } from '@fortawesome/free-solid-svg-icons';

const MenuComponent = () => {
  return (
    <Container>
      <Btn href="/"         btnName="home"     icon={faHouse}   />
      <Btn href="/calorias" btnName="calorias" icon={faFire}    />
      <Btn href="/treino"   btnName="treino"   icon={faDumbbell} />
    </Container>
  );
};

export default MenuComponent;
