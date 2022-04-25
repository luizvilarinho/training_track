import React, { useEffect, useState } from 'react';
import Semana from './Semana';
import {Idia} from './types';

type Props = {
   
}

type IdiasArray = {
    w1:Array<number>
    w2:Array<number>
    w3:Array<number>
    w4:Array<number>
    w5:Array<number>
}

function AgendaContent(props: Props) {

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
    }, [])
    useEffect(()=>{
        diasArrayGenerator();
    }, [ano, mes])

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
         
        w1 = primeirDiaDoMes === 0? new Array(6).fill(0) : new Array(parseFloat(primeirDiaDoMes) - 1).fill(0)
        var diasTotais = auxDiasNoMes(parseFloat(mes))

        
        for(let i = 1; i <= diasTotais; i++){
            if(w1.length < 7){
                w1.push(i)
            }else if (w2.length < 7) {
                w2.push(i)
            }else if(w3.length < 7) {
                w3.push(i)
            }else if(w4.length < 7) {
                w4.push(i)
            }else if(w5.length < 7 ) {
                w5.push(i)
            }
        }
        
        if(w5.length < 7){
            do{
                w5.push(0)
            }while(w5.length < 7)
        }
        
        setDiasArray({...diasArray, w1,w2, w3, w4, w5 })
    }

    function changeMonthHandler(e:string) {
        setMes(e)
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
                <Semana label="w1" diasArray={diasArray.w1} />
                <Semana label="w2" diasArray={diasArray.w2} />
                <Semana label="w3" diasArray={diasArray.w3} />
                <Semana label="w4" diasArray={diasArray.w4} />
                <Semana label="w5"diasArray={diasArray.w5}  />
            </div>
        </>
    );
}

export default AgendaContent;