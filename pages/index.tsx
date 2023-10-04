import type { NextPage } from 'next'
import Head from 'next/head'
import Card from '../components/Card';
import AgendaContent from '../components/AgendaContent';
import Lista from '../components/Lista';
import UltimoTreino from '../components/UltimoTreino';
import {Fragment, useEffect, useMemo, useState} from 'react';
import useGet from '../components/hooks/useGet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HomeCardCalorias from "../components/HomeCardCalorias";
import usePost from "../components/hooks/usePost";
import HeaderComponent from '../components/HeaderComponent';
import router from 'next/router';
import { Modal } from '../components/Modal';

const Home: NextPage = ({userData, isAuthenticated}:any) => {

const styleRodape = {
  'display': 'flex',
  'justifyContent': 'space-between',
  'fontSize': '.9rem',
  'border-top': '1px solid var(--primary-color-light)',
  'padding':'1rem 0'
}

const [dados, getTraining] = useGet({url: process.env.NEXT_PUBLIC_GETTRANING});
const [calculoCalorias, getCalculoCalorias] = usePost({url: process.env.NEXT_PUBLIC_REFEICAO_CALCULAR, payload:{data:new Date().toLocaleDateString()}})

useEffect(()=>{
    console.log("USERDATA",userData, isAuthenticated)

    if(isAuthenticated === false){
      router.push({
        pathname:'/login'
      })
    }else{
      const userDataString = JSON.stringify(userData);
      window.localStorage.setItem('TTDATA', userDataString)
      getTraining();
      getCalculoCalorias();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);



  return (
    <>
     
      <Head>
        <title>training track</title>
      </Head>

      {isAuthenticated? (
          <div>

            <div>
              <HeaderComponent userData={userData}/>
            </div>

            {calculoCalorias.loading === false && (
              <Card title={'Calorias'}>
                  <HomeCardCalorias healthData={userData.health_data} calculo={calculoCalorias.data} />
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
                    </div> : <UltimoTreino workoutData={dados.data[0]} />
                  }
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
        ):(
          <div className="loading">
            <div className="loading-ico">
                <FontAwesomeIcon icon={faSpinner} />
            </div>
          </div>
        ) 
      }

      <article className='version'>
        <div style={styleRodape}>
          <small >envia sua sugestão para luizvilarinho@zohomail.com</small>
          <small>v1.0.4</small>
        </div>
      </article>
    </>
  )
}

export async function getServerSideProps(context:any){
  const { req } = context;
  const acessToken = req.cookies.accesstoken || '';
  console.log("TOKEN",acessToken)


  if(!acessToken){
    return {
      props:{
        userData:"",
        isAuthenticated:false
      }
    }
  } 

  const url = process.env.NEXT_PUBLIC_GET_USER || ""
  
  let response;
  let userData;

  try{
    response = await fetch(url, {
      headers: {
        TTaccess: acessToken
      }
    })

    userData = await response.json()
  }catch(e){
    console.log(e)
    userData = []
  }

  
  

  return {
    props:{
      userData:userData[0],
      isAuthenticated: true
    }
  }
}

export default Home
