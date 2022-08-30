import Image from 'next/image'
import heart from "../../../public/assets/img/heart.svg"

// import { Container } from './styles';
type Props = {
    muscle:string
    sets:number
    isCardio:boolean
    width?:string
}



function Group(props:Props) {

    const cardioClass = props.isCardio? 'cardio' : ''
    const labelSets = props.isCardio? 'min' : 'series'
    return (
        <>
            <div className={`grupo-musculacao ${cardioClass} ${props.width}` }>
                
                <div className="chave">{ props.muscle}
                    {props.isCardio && (
                        <Image className="img-title" src={heart} alt="icone coracao" />
                    )}
                </div>
                
                <div className="bold valor">{props.sets} {labelSets}</div>
            </div>
        </>
    )
}

export default Group;
