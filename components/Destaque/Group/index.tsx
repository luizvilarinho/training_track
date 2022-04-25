import Image from 'next/image'
import heart from "../../../public/assets/img/heart.svg"

// import { Container } from './styles';
type Props = {
    muscle:string
    sets:number
    isCardio:boolean
}



function Group(props:Props) {

    const cardioClass = props.isCardio? 'cardio' : ''
    const labelSets = props.isCardio? 'min' : 'series'
    return (
        <>
            <div className={`grupo-musculacao ${cardioClass}` }>
                <div className="chave">{ props.muscle}</div>
                
                {props.isCardio && (
                    <Image className="img-title" src={heart} />
                )}
                <div className="bold valor">{props.sets} {labelSets}</div>
            </div>
        </>
    )
}

export default Group;
