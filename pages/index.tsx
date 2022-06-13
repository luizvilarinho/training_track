import type { NextPage } from 'next'
import Head from 'next/head'
import Card from '../components/Card';
import AgendaContent from '../components/AgendaContent';
import Destaque from '../components/Destaque';
import Lista from '../components/Lista';
import UltimoTreino from '../components/UltimoTreino';
import { useEffect } from 'react';
import useGet from '../components/hooks/useGet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Home: NextPage = () => {



const [dados, getTraining] = useGet({url: process.env.NEXT_PUBLIC_GETTRANING});

useEffect(()=>{
    getTraining();
    
}, []);

  return (
    <>
    
      <Head>
        <title>training track</title>
      </Head>
      <div>
      
      {dados.data.length > 0 &&
        <Card title="último treino" containerClass="flex-container gap-30">
          {dados.loading ? 
            <div className="loading-ico loading-center">
              <FontAwesomeIcon icon={faSpinner} />
            </div> : <UltimoTreino workoutData={dados.data[0]} />}
        </Card>
      }
      
      <Card title="agenda" containerClass=""> 
        <AgendaContent workouts={dados.data}/>
      </Card>
      
      {/* <Card title="essa semana" containerClass=''>
          
        <Destaque subtitle="treino geral"/>       
                
      </Card> */}
      
      <section hidden id="last-section">
        <Card title="último mês" containerClass=''>
            
          <Lista muscle="peitoral" sets={4} />
          <Lista muscle="peitoral" sets={4} />
          <Lista muscle="peitoral" sets={4} />
          <Lista muscle="peitoral" sets={4} />
          <Lista muscle="peitoral" sets={4} />
          <Lista muscle="peitoral" sets={4} />
          <Lista muscle="cardio" sets={150} />
            
          {/* <div className="sm-mar--top">
              <h4>cardio</h4>
              <div className="flex-container space-between">
                  <div className="md-mar--right">elíptico</div>
                  <div className="bold">35 min</div>
              </div>
          </div> */}
        </Card>

      </section>
    </div>
    </>
  )
}

export default Home
