import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import calendar from "../../public/assets/img/i_schedule_school_date_time.svg"
import { Workout } from "../types"



// import { Container } from './styles';
type Props = {
    workoutData: any
}

function UltimoTreino({ workoutData }: Props) {

  const [treinosMusculacao, setTreinosMusculacao] = useState<any>();
  const [treinosCardio, setTreinosCardio] = useState<any>();

  useEffect(()=>{
    if((!treinosMusculacao || !treinosCardio) && workoutData != undefined){
        let cardios = workoutData.training.filter((treino:Workout)=> treino.type === 2)
        let musculacao = workoutData.training.filter((treino:Workout)=> treino.type === 1)

        console.log(cardios, musculacao)
        setTreinosCardio(cardios)
        setTreinosMusculacao(musculacao)

    }
  }, [treinosMusculacao, treinosCardio, workoutData])

    return (
        <>
            <div className="flex-container-collumn align--center">
            <Image src={calendar} width={30} height={30} alt="calendario" />
            <div className="sm-mar--top">{workoutData?.date}</div>
          </div>
          
          <div>
            <div>
            
              {treinosMusculacao && treinosMusculacao.length > 0 && <h4>musculação</h4>}
              {treinosMusculacao && treinosMusculacao.map((workout:Workout)=>{
                    return (<div key={workout.id} className="flex-container space-between sm-mar--bottom">
                        <div className="md-mar--right">{workout.description}</div>
                        <div className="bold">{workout.sets} séries</div>
                    </div>)
                 
                  
                  
              })}

              {treinosCardio && treinosCardio.length > 0 && <h4 className="sm-mar--top">cardio</h4>}
              {treinosCardio && treinosCardio.map((cardio:any)=>{
                 return <div key={cardio.id} className="sm-mar--bottom">
                      <div className="flex-container space-between">
                          <div className="md-mar--right">{cardio.description}</div>
                          <div className="bold">{cardio.sets} min</div>
                      </div>
                  </div>
              })}
              
            </div>
          
            
          </div>
        </>
    );
}

export default UltimoTreino;