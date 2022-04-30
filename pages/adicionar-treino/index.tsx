import Head from 'next/head';
import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';

// import { Container } from './styles';

const adicionarTreino: React.FC = () => {

  const router = useRouter();

  useEffect(()=>{
    console.log(router)
  })
  return (
  <Fragment>
    <Head>
      <title>training track</title>
    </Head>
      <h1>Adicionar Treino</h1>
  </Fragment>);
}

export default adicionarTreino;