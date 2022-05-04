import Head from 'next/head';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import VisualizarTreino from './VisualizarTreino';
import AdicionarTreino from './AdicionarTreino';

// import { Container } from './styles';

const TreinoContainer: React.FC = () => {

  const router = useRouter();
  const [showHide, setShowHide] = useState('show')

  function showComponentHandler(){
    let hasTraining = router.query?.workoutid && router.query?.workoutid != '0';
    let isEditable = router.query?.editar
    if(hasTraining && !isEditable){
      return <VisualizarTreino></VisualizarTreino>
    }else{
      return <AdicionarTreino show={showHide}></AdicionarTreino>
    }
  }

  function showHideHandler(){
    if(showHide === 'show'){
      setShowHide('hide')
    }else{
      setShowHide('show');
    }
  }

  return (
  <Fragment>
    <Head>
      <title>training track</title>
    </Head>
      

      {showComponentHandler()}
      
    {/* <button onClick={showHideHandler}>Hide</button> */}
  </Fragment>);
}

export default TreinoContainer;