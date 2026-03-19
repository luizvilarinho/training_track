import React, { useEffect, useState } from 'react';
import { Workout } from "../types";

type Props = {
  workoutData: any
}

function UltimoTreino({ workoutData }: Props) {
  const [treinosMusculacao, setTreinosMusculacao] = useState<any>();
  const [treinosCardio, setTreinosCardio] = useState<any>();

  useEffect(() => {
    if ((!treinosMusculacao || !treinosCardio) && workoutData != undefined) {
      setTreinosCardio(workoutData.training.filter((t: Workout) => t.type === 2));
      setTreinosMusculacao(workoutData.training.filter((t: Workout) => t.type === 1));
    }
  }, [treinosMusculacao, treinosCardio, workoutData]);

  const totalSets = workoutData?.training?.reduce((acc: number, t: any) => acc + t.sets, 0) || 0;
  const totalExercises = workoutData?.training?.length || 0;

  return (
    <>
      {/* Summary badges */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <span className="stat-badge">{workoutData?.date}</span>
        <span className="stat-badge">{totalExercises} exerc.</span>
        <span className="stat-badge">{totalSets} séries</span>
      </div>

      <div style={{ width: '100%' }}>
        {treinosMusculacao && treinosMusculacao.length > 0 && (
          <>
            <h4 style={{
              fontSize: '.65rem',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontWeight: 700,
              marginBottom: '10px',
            }}>
              musculação
            </h4>
            {treinosMusculacao.map((workout: Workout) => (
              <div key={workout.id} className="flex-container space-between sm-mar--bottom">
                <div style={{ color: 'var(--text-primary)' }}>{workout.description}</div>
                <div className="bold" style={{ color: 'var(--primary-color-light)' }}>
                  {workout.sets} séries
                </div>
              </div>
            ))}
          </>
        )}

        {treinosCardio && treinosCardio.length > 0 && (
          <>
            <h4 style={{
              fontSize: '.65rem',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontWeight: 700,
              margin: '14px 0 10px',
            }}>
              cardio
            </h4>
            {treinosCardio.map((cardio: any) => (
              <div key={cardio.id} className="sm-mar--bottom">
                <div className="flex-container space-between">
                  <div style={{ color: 'var(--text-primary)' }}>{cardio.description}</div>
                  <div className="bold" style={{ color: 'var(--accent-green)' }}>
                    {cardio.sets} min
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default UltimoTreino;
