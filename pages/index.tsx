import type { NextPage } from 'next'
import Head from 'next/head'

import HeaderComponent from "../components/HeaderComponent";
import MenuComponent from '../components/MenuComponent';
import Card from '../components/Card';
import AgendaContent from '../components/AgendaContent';
import Destaque from '../components/Destaque';
import Lista from '../components/Lista';
import UltimoTreino from '../components/UltimoTreino';
import { useEffect } from 'react';
import useGet from '../components/hooks/useGet';

const Home: NextPage = () => {

const user = {
  name: "Luiz Vilarinho"
}

const [dados, getTraining] = useGet({url: process.env.NEXT_PUBLIC_GETTRANING});



useEffect(()=>{
  
  if(!dados){
    getTraining();
  }
  
}, []);

  return (
    <div>
      <HeaderComponent name={user.name}/>
      <MenuComponent/>
    

      <div className="main"> 
        
        <Card title="último treino" containerClass="flex-container gap-30">
          <UltimoTreino workoutData={dados} />
        </Card>
        
        <Card title="agenda" containerClass=""> 
          <AgendaContent />
        </Card>
        
        <Card title="essa semana" containerClass=''>
            
          <Destaque subtitle="treino geral"/>       
                  
        </Card>
        
        <section id="last-section">
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
    </div>
  )
}

export default Home
