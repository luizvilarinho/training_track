import Btn from "./Btn";
import Container from "./Container";

const MenuComponent = ()=>{
    return (
        <Container>
            <Btn btnName="home"/>
            <Btn btnName="+ treino"/>
            <Btn btnName="tools"/>
        </Container>
              
    )
}

export default MenuComponent;