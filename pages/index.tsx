import type { NextPage } from 'next'
import Head from 'next/head'
import Card from '../components/Card';
import AgendaContent from '../components/AgendaContent';
import Lista from '../components/Lista';
import UltimoTreino from '../components/UltimoTreino';
import {Fragment, useEffect, useMemo} from 'react';
import useGet from '../components/hooks/useGet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import HomeCardCalorias from "../components/HomeCardCalorias";
import usePost from "../components/hooks/usePost";

const Home: NextPage = () => {



const [dados, getTraining] = useGet({url: process.env.NEXT_PUBLIC_GETTRANING});
const [calculoCalorias, getCalculoCalorias] = usePost({url: process.env.NEXT_PUBLIC_REFEICAO_CALCULAR, payload:{data:new Date().toLocaleDateString()}})

useEffect(()=>{
    getTraining();
    getCalculoCalorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <>
    
      <Head>
        <title>training track</title>
      </Head>
      <div>

      {/*{Object.keys(dados.data).length === 0 && (*/}
      {/*    <Fragment>*/}
      {/*        <div className="loading">*/}
      {/*            <div className="loading-ico">*/}
      {/*                <FontAwesomeIcon icon={faSpinner} />*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*    </Fragment>*/}
      {/*)}*/}

      {calculoCalorias.loading === false && (
          <Card title={'Calorias'}>
              <HomeCardCalorias calculo={calculoCalorias.data} />
          </Card>
      )}





          <Card title="agenda" containerClass="">
              <AgendaContent workouts={dados.data}/>
          </Card>

          {dados.data.length > 0 &&
              <Card title="último treino" containerClass="flex-container gap-30">
                  {dados.loading ?
                      <div className="loading-ico loading-center">
                          <FontAwesomeIcon icon={faSpinner} />
                      </div> : <UltimoTreino workoutData={dados.data[0]} />}
              </Card>
          }

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
