import type { NextPage } from 'next'
import Head from 'next/head'
import Card from '../components/Card';
import AgendaContent from '../components/AgendaContent';
import Lista from '../components/Lista';
import UltimoTreino from '../components/UltimoTreino';
import {useEffect, useState} from 'react';
import useGet from '../components/hooks/useGet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import HomeCardCalorias from "../components/HomeCardCalorias";
import usePost from "../components/hooks/usePost";
import HeaderComponent from '../components/HeaderComponent';
import router from 'next/router';
import UltimaSemana from '../components/UltimaSemana';

const Home: NextPage = () => {

const styleRodape = {
  'display': 'flex',
  'justifyContent': 'space-between',
  'fontSize': '.9rem',
  'border-top': '1px solid var(--primary-color-light)',
  'padding':'1rem 0'
}

const [userData, getUserData] = useGet({url: process.env.NEXT_PUBLIC_GET_USER});
const [dados, getTraining] = useGet({url: process.env.NEXT_PUBLIC_GETTRANING});
const [calculoCalorias, getCalculoCalorias] = usePost({url: process.env.NEXT_PUBLIC_REFEICAO_CALCULAR, payload:{data:new Date().toLocaleDateString()}})

const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(()=>{

  //console.log("userData", userData)
  getUserData();
  
    //console.log("USERDATA",userData, isAuthenticated)

    // if(isAuthenticated === false){
    //   router.push({
    //     pathname:'/login'
    //   })
    // }else{
    //   const userDataString = JSON.stringify(userData);
    //   window.localStorage.setItem('TTDATA', userDataString)
    //   getTraining();
    //   getCalculoCalorias();
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(()=>{
  if(userData?.data[0]?.success){
    console.log("USARDATA", userData)
    window.scrollTo({left:0, top:0});
    setIsAuthenticated(true)
    getTraining();
    getCalculoCalorias();

    const userDataString = JSON.stringify(userData);
    window.localStorage.setItem('TTDATA', userDataString)
  }
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, [userData])


  return (
    <>
     
      <Head>
        <title>training track</title>
      </Head>

      {isAuthenticated? (
          <div>

            <div>
              <HeaderComponent userData={userData?.data[0]?.user}/>
            </div>

            {calculoCalorias.loading === false && (
              <Card title={'Calorias'}>
                  <HomeCardCalorias healthData={userData?.data[0]?.user.health_data} calculo={calculoCalorias.data} />
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
              {dados.data.length > 0 && (
                <Card title="últimos 7 dias" containerClass=''>
                  <UltimaSemana />
                </Card>
              )}

            
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

// export async function getServerSideProps(context:any){
//   const { req, res } = context;

//   res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=10, stale-while-revalidate=10'
//   )

//   const acessToken = req.cookies.accesstoken || '';
//   console.log("TOKEN",acessToken)


//   if(!acessToken){
//     return {
//       props:{
//         userData:"",
//         isAuthenticated:false
//       }
//     }
//   } 

//   const url = process.env.NEXT_PUBLIC_GET_USER || ""
  
//   let response;
//   let userData;

//   try{
//     response = await fetch(url, {
//       headers: {
//         TTaccess: acessToken
//       }
//     })

//     userData = await response.json()
//   }catch(e){
//     console.log(e)
//     userData = []
//   }

  
  

//   return {
//     props:{
//       userData:userData[0],
//       isAuthenticated: true
//     }
//   }
// }

export default Home
