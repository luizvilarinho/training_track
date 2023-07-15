import { useEffect, useState } from "react";
import Card from "../../components/Card";
import HeaderComponent from "../../components/HeaderComponent";
import styles from './Metas.module.css';
import calcularDistribuicaoMacros from "./calcularDistribuicaoMacros";
import usePost from "../../components/hooks/usePost";
import Alert from "../../components/Alert";
import useAlert from "../../components/hooks/useAlert";
import { DistribuicaoMacros, UserData } from "./types";

const Metas = () => {
    const [postHealthData, postHealthDataCall] = usePost({url: process.env.NEXT_PUBLIC_HEALTH_DATA, payload: null});
    
    let userDataStorage:UserData = JSON.parse(localStorage.getItem('TTDATA') || '');

    const [userData, setUserData] = useState(userDataStorage);

    const [show, alertShowHide] = useAlert();

    const [distribuicaoMacros, setDistribuicaoMacros] = useState<DistribuicaoMacros>({
        calorias:userData.health_data?.meta_calorias,
        p:{
            qnt:userData.health_data?.meta_macros?.p,
            porcentagem:0
        },
        c:{
            qnt:userData.health_data?.meta_macros?.c,
            porcentagem:0
        },
        g:{
            qnt:userData.health_data?.meta_macros?.g,
            porcentagem:0
        }
    })

    const [lock, setLock] = useState(true);
    const [lock2, setLock2] = useState(true);
    
   useEffect(()=>{
    if(userData.health_data?.meta_calorias){
        let distMacros:DistribuicaoMacros = {...distribuicaoMacros, calorias: userData.health_data?.meta_calorias}
        let newDataMacros = calcularDistribuicaoMacros(distMacros)
        setDistribuicaoMacros(newDataMacros)
    }
    
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [userData.health_data?.meta_calorias])

    function changeDataHandler(value:string, field:string){
    let currentValue = parseInt(value, 10);

        switch(field){
            case 'altura':
                if(currentValue < 0 || !currentValue){
                    setUserData({...userData, health_data: {...userData.health_data, height: 0}})
                    break;
                }

                if(Number(value) >= 280){
                    setUserData({...userData, health_data: {...userData.health_data, height: 280}})
                } else{
                    setUserData({...userData, health_data: {...userData.health_data, height: currentValue}})
                }

                setLock(false);
                
                break;
            case 'peso':
                
                if(currentValue < 0 || !currentValue){
                    setUserData({...userData, health_data: {...userData.health_data, weight: 0}})
                    break;
                }

                if(Number(value) >= 200){
                    setUserData({...userData, health_data: {...userData.health_data, weight: 200}})
                } else{
                    setUserData({...userData, health_data: {...userData.health_data, weight: currentValue}})
                }

                setLock(false);

                break;

            case 'calorias':
                if(currentValue < 0 || !currentValue){
                    setUserData({...userData, health_data: {...userData.health_data, meta_calorias: 0}})
                    break;
                }

                if(Number(value) >= 10000){
                    setUserData({...userData, health_data: {...userData.health_data, meta_calorias: 10000}})
                } else{
                    setUserData({...userData, health_data: {...userData.health_data, meta_calorias: currentValue}})
                }

                setLock2(false)


                break;

            case 'p':
                if(currentValue < 0 || !currentValue){
                    setDistribuicaoMacros({...distribuicaoMacros, p: {...distribuicaoMacros.p, qnt:0}})
                    break;
                }

                setDistribuicaoMacros({...distribuicaoMacros, p: {...distribuicaoMacros.p, qnt:currentValue}})
                calcularDistribuicaoMacrosHandler('p', currentValue)
                setLock2(false)
            break;

            case 'c':
                if(currentValue < 0 || !currentValue){
                    setDistribuicaoMacros({...distribuicaoMacros, c: {...distribuicaoMacros.c, qnt:0}})
                    break;
                }

                setDistribuicaoMacros({...distribuicaoMacros, c: {...distribuicaoMacros.c, qnt:currentValue}})
                calcularDistribuicaoMacrosHandler('c', currentValue)
                setLock2(false)
            break;

            case 'g':
                if(currentValue < 0 || !currentValue){
                    setDistribuicaoMacros({...distribuicaoMacros, g: {...distribuicaoMacros.g, qnt:0}})
                    break;
                }

                setDistribuicaoMacros({...distribuicaoMacros, g: {...distribuicaoMacros.g, qnt:currentValue}})
                calcularDistribuicaoMacrosHandler('g', currentValue)
                setLock2(false)
            break;
            
        }
    }


    function calcularDistribuicaoMacrosHandler(macro?:string, value?:number): void{
      
        let calc: DistribuicaoMacros = calcularDistribuicaoMacros(distribuicaoMacros, macro, value)
       
        setDistribuicaoMacros({...distribuicaoMacros, ...calc})
        
    }

    function gravarMacros(){
        let payload ={
            meta_calorias: distribuicaoMacros.calorias,
            meta_macros: {
                p: distribuicaoMacros.p.qnt,
                c: distribuicaoMacros.c.qnt,
                g: distribuicaoMacros.g.qnt
            }
        }

        postHealthDataCall(payload);
        setLock2(true)
        alertShowHide()
        console.log("postHealthData",postHealthData)
    }

    function gravarDadosPessoais(){
        let payload ={
            height: userData.health_data.height,
            weight: userData.health_data.weight
        }


        postHealthDataCall(payload);
        setLock(true)
        alertShowHide()
    }

    return (
        <>
       <Alert show={show} mensagem="suas informações foram salvas" />
        
         <div>
            <HeaderComponent userData={userData}/>
        </div>
        <div className={styles.metas}>
            <Card title="Dados pessoais">
                <div className={styles.dadosPessoais}>
                    <div className={styles.item}>
                        <label htmlFor="alimento">Altura (cm)</label>
                        <input type='number' 
                            id="altura"
                            onInput={(event)=>changeDataHandler(event.currentTarget.value, 'altura')} 
                            value={String(userData.health_data?.height)} 
                            placeholder="digite sua altura"
                            max={280}
                            step={1}
                            autoComplete="off"
                        />

                    </div>
                    <div className={styles.item}>
                        <label htmlFor="alimento">Peso (kg)</label>
                        <input type='number' 
                            id="peso" 
                            onInput={(event)=>changeDataHandler(event.currentTarget.value, 'peso')} 
                            value={String(userData.health_data?.weight)} 
                            placeholder="digite seu peso"
                            autoComplete="off"
                        />
                    </div>

                </div>
                <div className="align--center sm-mar--bottom">
                    <button 
                        className={lock? 'inactive' : 'active'}
                        onClick={gravarDadosPessoais}
                    >
                        Salvar
                    </button>
                </div>
            </Card>
            <Card title="Meta de calorias por dia">
                <div className={styles.calorias}>
                    <div className={styles.item}>
                        <label htmlFor="alimento">Meta de calorias</label>
                        <input type='number' 
                            id="calorias" 
                            onInput={(event)=>changeDataHandler(event.currentTarget.value, 'calorias')} 
                            value={String(userData.health_data?.meta_calorias)}
                            max={10000} 
                            step={10}
                            placeholder="digite quantidade de calorias"
                            autoComplete="off"
                        />
                    </div>
                    {userData.health_data?.meta_calorias && (
                        <div>
                            <div className={styles.macros}>
                                <h3>Distribuição dos macros nutrientes</h3>
                                <div className={styles.distribuicaoMacrosContainer}>
                                    <div className={styles.item}>
                                        <div>
                                            <label htmlFor="alimento">quantidade de proteína (g)</label>
                                            <input type='number' 
                                                id="calorias" 
                                                onChange={(event)=>changeDataHandler(event.currentTarget.value, 'p')}
                                                value={String(distribuicaoMacros.p.qnt)}
                                                placeholder="digite quantidade de calorias"
                                                autoComplete="off"
                                            />

                                        </div>
                                        <div className={styles.porcentagem}>{distribuicaoMacros.p.porcentagem}%</div>
                                    </div>
                                    
                                    <div className={styles.item}>
                                        <div>
                                            <label htmlFor="alimento">quantidade de carboidrato (g)</label>
                                            <input type='number' 
                                                id="calorias" 
                                                onChange={(event)=>changeDataHandler(event.currentTarget.value, 'c')}
                                                value={String(distribuicaoMacros.c.qnt)}
                                                placeholder="digite quantidade de calorias"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className={styles.porcentagem}>{distribuicaoMacros.c.porcentagem}%</div>
                                    </div>
                                    <div className={styles.item}>
                                        <div>
                                            <label htmlFor="alimento">quantidade de gordura (g)</label>
                                            <input type='number' 
                                                id="calorias" 
                                                onInput={(event)=>changeDataHandler(event.currentTarget.value, 'meta_macros')}
                                                onChange={(event)=> calcularDistribuicaoMacrosHandler('g')} 
                                                value={distribuicaoMacros.g.qnt}
                                                placeholder="digite quantidade de calorias"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className={styles.porcentagem}>{distribuicaoMacros.g.porcentagem}%</div>
                                    </div>
                                </div>
                            </div>

                            <div className="align--center sm-mar--bottom md-mar--top">
                                <button 
                                className={lock2? 'inactive' : 'active'}
                                onClick={gravarMacros}
                                >Salvar</button>
                            </div>
                        </div>

                    )}

                </div>
            </Card>

        </div>
        </>
    )
}

export default Metas;