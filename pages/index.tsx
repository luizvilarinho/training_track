import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import AgendaContent from '../components/AgendaContent';
import Card from '../components/Card';
import HeaderComponent from '../components/HeaderComponent';
import HomeCardCalorias from "../components/HomeCardCalorias";
import useGet from '../components/hooks/useGet';
import usePost from "../components/hooks/usePost";
import UltimaSemana from '../components/UltimaSemana';
import UltimoTreino from '../components/UltimoTreino';
import styles from './index.module.css';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

const styleRodape = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '.85rem',
  borderTop: '1px solid rgba(125, 96, 211, 0.12)',
  padding: '1rem 0',
  color: 'var(--text-muted)',
};

const Home: NextPage = () => {

  const [userData, getUserData] = useGet({ url: process.env.NEXT_PUBLIC_GET_USER });
  const [dados, getTraining] = useGet({ url: process.env.NEXT_PUBLIC_GETTRANING });
  const [calculoCalorias, getCalculoCalorias] = usePost({ url: process.env.NEXT_PUBLIC_REFEICAO_CALCULAR, payload: { data: new Date().toLocaleDateString() } });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData?.data[0]?.success) {
      window.scrollTo({ left: 0, top: 0 });
      setIsAuthenticated(true);
      getTraining();
      getCalculoCalorias();
      const userDataString = JSON.stringify(userData);
      window.localStorage.setItem('TTDATA', userDataString);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const userName = userData?.data[0]?.user?.name?.split(' ')[0];
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <>
      <Head>
        <title>training track</title>
      </Head>

      {isAuthenticated ? (
        <div>
          <HeaderComponent userData={userData?.data[0]?.user} />

          {/* Greeting */}
          <div className={styles.greeting}>
            <div style={{
              color: 'var(--text-muted)',
              fontSize: '.68rem',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              {today}
            </div>
            <div style={{
              color: 'var(--text-primary)',
              fontSize: '1.55rem',
              fontWeight: 700,
              marginTop: '4px',
              letterSpacing: '-0.02em',
            }}>
              {getGreeting()}{userName ? `, ${userName}` : ''} 💪
            </div>
          </div>

          {calculoCalorias.loading === false && (
            <Card title={'Calorias'}>
              <HomeCardCalorias
                healthData={userData?.data[0]?.user.health_data}
                calculo={calculoCalorias.data}
              />
            </Card>
          )}

          <Card title="agenda" containerClass="">
            <AgendaContent workouts={dados.data} />
          </Card>

          {dados.data.length > 0 && (
            <Card title="último treino" containerClass="flex-container gap-70">
              {dados.loading ? (
                <div className="loading-ico loading-center">
                  <FontAwesomeIcon icon={faSpinner} />
                </div>
              ) : (
                <UltimoTreino workoutData={dados.data[0]} />
              )}
            </Card>
          )}

          {dados.data.length > 0 && (
            <Card title="últimos 7 dias" containerClass=''>
              <UltimaSemana />
            </Card>
          )}

        </div>
      ) : (
        <div className="loading">
          <div className="loading-ico">
            <FontAwesomeIcon icon={faSpinner} />
          </div>
        </div>
      )}

      <article className='version'>
        <div style={styleRodape}>
          <small>sugestões: <strong>luizvilarinho@zohomail.com</strong></small>
          <small>v1.0.7</small>
        </div>
      </article>
    </>
  );
};

export default Home;
