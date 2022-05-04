import Btn from "./Btn";
import Container from "./Container";

const MenuComponent = ()=>{

  

    return (
        <Container>
            <Btn href="/" btnName="home"/>
            <Btn href="./treino" btnName="+ treino"/>
            <Btn href="ferramentas" btnName="tools"/>
        </Container>
              
    )
}

export default MenuComponent;