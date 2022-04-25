import React from 'react';

// import { Container } from './styles';
type Props = {
    muscle:string
    sets:number
}

function Lista(props:Props) {
    
    const adjustment = {
        class: props.muscle === 'cardio' ? 'md-mar--top' : '',
        setsLabel: props.muscle == 'cardio' ? 'min' : 'series'
    }

    return (
        <div className={`flex-container space-between ${adjustment.class}`}>
            <div className="md-mar--right">{props.muscle}</div>
            <div className="bold">{props.sets} {adjustment.setsLabel}</div>
        </div>
    );
}

export default Lista;