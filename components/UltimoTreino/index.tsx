import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import calendar from "../../public/assets/img/i_schedule_school_date_time.svg"
import { Iworkout, Workout } from "../types"



// import { Container } from './styles';
type Props = {
    workoutData: any
}

function UltimoTreino({ workoutData }: Props) {

    const [dataTreino, setDataTreino] = useState<string>('');

    useEffect(()=>{
        if(workoutData?.date != undefined){
            let d = new Date(workoutData.date).toLocaleDateString();
            setDataTreino(d);
        }
        
    }, [workoutData]);

    return (
        <>
            <div className="flex-container-collumn align--center">
            <Image src={calendar} width={30} height={30}/>
            <div className="sm-mar--top">{dataTreino}</div>
          </div>
          
          <div>
            <div>
              <h4>musculação</h4>
              {workoutData?.workouts.map((workout:Workout, idx:number): any=>{
                  if(workout.sets != '0' && workout.type === 'bodybuilding'){
                    return <div key={idx} className="flex-container space-between">
                        <div className="md-mar--right">{workout.description}</div>
                        <div className="bold">{workout.sets} séries</div>
                    </div>
                  }

                  if(workout.type === 'cardio' && workout.sets != '='){
                     return <div key={idx} className="sm-mar--top">
                                <h4>cardio</h4>
                                <div className="flex-container space-between">
                                    <div className="md-mar--right">elíptico</div>
                                    <div className="bold">35 min</div>
                                </div>
                            </div>
                  }
                  
              })}
              
            </div>
          
            
          </div>
        </>
    );
}

export default UltimoTreino;