import React, { useEffect, useState } from 'react';
import { Iworkout } from '../types';
import Semana from './Semana';
import {Idia} from './types';

type Props = {
   workouts:Array<Iworkout>
}

type diasTreino = {
    dia: number
    workoutId: number
}

type IdiasArray = {
    w1:Array<diasTreino>
    w2:Array<diasTreino>
    w3:Array<diasTreino>
    w4:Array<diasTreino>
    w5:Array<diasTreino>
}

function AgendaContent({ workouts }:Props) {

    const [mes, setMes] = useState<string>('01');
    const [ano, setAno] = useState<string>('2022');

    const monthArray: Array<Idia> = [
        { name: 'Janeiro', value: '01' },
        { name: 'fevereiro', value: '02' },
        { name: 'março', value: '03' },
        { name: 'abril', value: '04' },
        { name: 'maio', value: '05' },
        { name: 'junho', value: '06' },
        { name: 'julho', value: '07' },
        { name: 'agosto', value: '08' },
        { name: 'setembro', value: '09' },
        { name: 'outubro', value: '10' },
        { name: 'novembro', value: '11' },
        { name: 'dezembro', value: '12' }
    ];

    const labelSemana: Array<string> = ['m', 't', 'w', 't', 'f', 's', 's'];

    const [diasArray, setDiasArray] = useState<IdiasArray>({
        w1: [],
        w2: [],
        w3: [],
        w4: [],
        w5: []
    });

    useEffect(()=>{
        var now:Date | number = new Date().getMonth() + 1;
        var mesAtual = now.toString();
        mesAtual = mesAtual.length === 1? '0' + mesAtual : mesAtual

        setMes(mesAtual)

        console.log("WORKOUTS AGENDA", workouts)
    }, []);

    useEffect(()=>{
        diasArrayGenerator();
    }, [ano, mes, workouts])

    function auxDiasNoMes(mes:number) {
        var anoParser = parseFloat(ano);
        var data = new Date(anoParser, mes, 0); 
        
        return data.getDate()
    }

    function diasArrayGenerator() {
        let primeirDiaDoMes:any = new Date(`${mes}/01/${ano}`).getDay();

        let w1 = []
        let w2 = []
        let w3 = []
        let w4 = []
        let w5 = []
         
        w1 = primeirDiaDoMes === 0? new Array(6).fill({dia:0, workoutId:0}) : new Array(parseFloat(primeirDiaDoMes) - 1).fill({dia:0, workoutId:0})
        var diasTotais = auxDiasNoMes(parseFloat(mes))

        
        
        for(let i = 1; i <= diasTotais; i++){
            if(w1.length < 7){
                auxVerifyIfHasTraining(i)
                let workoutId = auxVerifyIfHasTraining(i)
                w1.push({dia: i, workoutId })
            }else if (w2.length < 7) {
                let workoutId = auxVerifyIfHasTraining(i)
                w2.push({dia: i, workoutId})
            }else if(w3.length < 7) {
                let workoutId = auxVerifyIfHasTraining(i)
                w3.push({dia: i, workoutId})
            }else if(w4.length < 7) {
                let workoutId = auxVerifyIfHasTraining(i)
                w4.push({dia: i, workoutId})
            }else if(w5.length < 7 ) {
                let workoutId = auxVerifyIfHasTraining(i)
                w5.push({dia: i, workoutId})
            }
        }
        
        if(w5.length < 7){
            do{
                w5.push({dia:0, workoutId:0})
            }while(w5.length < 7)
        }
        
        setDiasArray({...diasArray, w1,w2, w3, w4, w5 })
        console.log("diasArray", diasArray)
    }

    function changeMonthHandler(e:string) {
        setMes(e)
    }

    //verify is the day has training and return de workoutId
    function auxVerifyIfHasTraining(dia:number): number{
        let diaParser = String(dia).length === 1 ? `0${dia}` : String(dia)
        let incomingDate = `${diaParser}/${mes}/${ano}`;
        
        for(let i = 0; i < workouts.length; i++){
           
            if(String(workouts[i].date) === incomingDate){
                return workouts[i].id
            }
        }
        return 0
    }

    return (
        <>
            <div className="sm-mar--top">
                <select id="mes-select" onChange={(e) => changeMonthHandler(e.currentTarget.value)} value={mes}>
                    {monthArray.map((item, idx) => <option key={idx} value={item.value}>{item.name}</option>)}
                </select>
                <select id="ano-select" onChange={void (0)}>
                    <option value="2022">2022</option>
                </select>
            </div>
            <article>
                <div className="grid-semana">
                    <div></div>
                    {labelSemana.map((item, idx) => <div key={idx}>{item}</div>)}
                </div>
            </article>
            <div className="w-container">
                <Semana label="w1" diasArray={diasArray.w1} mes={mes}/>
                <Semana label="w2" diasArray={diasArray.w2} mes={mes} />
                <Semana label="w3" diasArray={diasArray.w3} mes={mes} />
                <Semana label="w4" diasArray={diasArray.w4} mes={mes} />
                <Semana label="w5"diasArray={diasArray.w5}  mes={mes} />
            </div>
        </>
    );
}

export default AgendaContent;