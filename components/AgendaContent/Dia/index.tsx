import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

type Props = {
    day:string
    className: string
    mes:string
    workoutId:number
}

function Dia(props: Props) {

    const router = useRouter();

    const [workedClass, setWorkedClass] = useState('');
    const [year, setYear] = useState('');

    useEffect(()=>{
        let year = new Date().getFullYear();

        setYear(String(year));
    },[]);

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
            <div className={`${props.className} ${workedClass} pointer` } data-dia={props.day} 
            // onClick={()=>{
            //     // workedClass === 'worked' ? setWorkedClass('') : setWorkedClass('worked')
            //     router.push({
            //         pathname: 'treino',
            //         query: { workoutid: props.workoutId, calendar:`${String(props.day).length == 1 ? '0'+String(props.day): String(props.day)}/${props.mes}/${year}` }
            //     })
            // }}
            >
                <Link href={`/treino?workoutid=${props.workoutId}&calendar=${String(props.day).length == 1 ? '0'+String(props.day): String(props.day)}/${props.mes}/${year}`}>
                    <div className={`number-day ${findToday()}`}>{props.day != '0' ? props.day : ''}</div>
                </Link>
            </div>
        </>
    );
}

export default Dia;