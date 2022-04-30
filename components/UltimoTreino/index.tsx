import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import calendar from "../../public/assets/img/i_schedule_school_date_time.svg"
import { Workout } from "../types"



// import { Container } from './styles';
type Props = {
    workoutData: any
}

function UltimoTreino({ workoutData }: Props) {


    return (
        <>
            <div className="flex-container-collumn align--center">
            <Image src={calendar} width={30} height={30}/>
            <div className="sm-mar--top">{workoutData?.date}</div>
          </div>
          
          <div>
            <div>
              <h4>musculação</h4>
              {workoutData && workoutData.training && workoutData.training.map((workout:Workout, idx:number): any=>{
                  if( workout.type === 1 ){
                    return <div key={idx} className="flex-container space-between">
                        <div className="md-mar--right">{workout.description}</div>
                        <div className="bold">{workout.sets} séries</div>
                    </div>
                  }

                  if(workout.type === 2){
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