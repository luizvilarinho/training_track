import Image from 'next/image'
import exercise_weights from "../../public/assets/img/exercise_weights.svg"
import Group from './Group'


// import { Container } from './styles';
type Props = {
    subtitle:string
}

function Destaque(props:Props ) {
    return (
        <>
            <h4>
              <Image className="img-title" src={exercise_weights}/>
              {props.subtitle}
            </h4>
            
            <Group muscle="peitoral" sets={4} isCardio={false} />
            <Group muscle="peitoral" sets={4} isCardio={false} />
            <Group muscle="peitoral" sets={4} isCardio={false} />
            <Group muscle="peitoral" sets={4} isCardio={false} />
            <Group muscle="esteira" sets={128} isCardio={true} />
          
          
         
        </>
    )
}

export default Destaque;