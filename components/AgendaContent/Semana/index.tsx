import React, { useEffect } from 'react';
import Dia from '../Dia';

// import { Container } from './styles';
type Props = {
    label:string
    diasArray:Array<{dia:number, workoutId:number}>
    mes:string
}

function Semana(props:Props) {

    useEffect(()=>{
    },[props.diasArray])
    return (
        <article>
                <div className="grid-semana">
                    <span>{ props.label }</span> 
                        {props.diasArray.map((diaTreino:{dia:number, workoutId:number}, idx:number)=>{
                            let diaClass = diaTreino.dia === 0? 'dia off' : 'dia';
                            diaClass += diaTreino.workoutId != 0? ' worked' : ''
                           return <Dia key={idx} day={String(diaTreino.dia)} className={diaClass} mes={props.mes} workoutId={diaTreino.workoutId} />
                        })}
                       
                    </div>
            </article>
    )
}

export default Semana;
