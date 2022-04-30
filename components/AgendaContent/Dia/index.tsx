import React, { useState } from 'react';
import { useRouter } from 'next/router'

type Props = {
    day:string
    className: string
    mes:string
    workoutId:number
}

function Dia(props: Props) {

    const router = useRouter();

    const [workedClass, setWorkedClass] = useState('');

    function findToday(): string{
        
        let today = new Date().getDate();
        let mesAtual:any = new Date().getMonth() + 1;
        mesAtual = String(mesAtual).length === 1 ? `0${mesAtual}` : mesAtual;

        if(props.mes != String(mesAtual)) {
            return ""
        };

        if(props.day === String(today)){
            return 'today'
        }else{
            return ""
        }

    }
    return (
        <>
            <div className={`${props.className} ${workedClass}` } data-dia={props.day} onClick={()=>{
                // workedClass === 'worked' ? setWorkedClass('') : setWorkedClass('worked')
                router.push({
                    pathname: 'adicionar-treino',
                    query: { workoutid: props.workoutId }
                })
            }}>
                <div className={`number-day ${findToday()}`}>{props.day != '0' ? props.day : ''}</div>
                </div>
        </>
    );
}

export default Dia;