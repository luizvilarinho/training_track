import React, { useEffect } from 'react';
import Dia from '../Dia';

// import { Container } from './styles';
type Props = {
    label:string
    diasArray:Array<number>
}

function Semana(props:Props) {

    useEffect(()=>{
    },[props.diasArray])
    return (
        <article>
                <div className="gr">
                    <span>{ props.label }</span> 
                    <div className="dias-container">
                        {props.diasArray.map((dia:number, idx:number)=>{
                            let diaClass = dia === 0? 'dia off' : 'dia';
                           return <Dia key={idx} day="dia" className={diaClass} />
                        })}
                       
                    </div>
                </div>
            </article>
    )
}

export default Semana;