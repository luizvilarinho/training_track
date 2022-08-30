import { faCircleArrowLeft, faCircleMinus, faCirclePlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import Card from '../../../components/Card';
import useGet from '../../../components/hooks/useGet';
import usePost from '../../../components/hooks/usePost';
import usePut from '../../../components/hooks/usePut';
import { Iworkout } from '../../../components/types';

// import { Container } from './styles';
type Props = {
    show:string
}

type Itreino = {
    description:string
    type:number
    sets:number
}

type ItreinoResponse =  Itreino & {
    id:number
}

type Error = {
    error: boolean
    message: string
}


function AdicionarTreino(props: Props) {

    const router = useRouter();

    const [hasError, setHasError] = useState<Error>({error:false, message: ''});

    const [data, postCall] = usePost({url: process.env.NEXT_PUBLIC_GETTRANING, payload: null});
    const [treino, getCall] = useGet({url: `${process.env.NEXT_PUBLIC_GETTRANING}?workoutid=${router.query.workoutid}`});
    const [putDados, putCall] = usePut({url: `${process.env.NEXT_PUBLIC_GETTRANING}/${router.query.workoutid}`, payload: null})

    const [peitoral, setPeitoral] = useState<{id:number, sets:number}>({id:0, sets:0});
    const [biceps, setBiceps] = useState<{id:number, sets:number}>({id:0, sets:0});
    const [triceps, setTriceps] = useState<{id:number, sets:number}>({id:0, sets:0});
    const [deltoide, setDeltoide] = useState<{id:number, sets:number}>({id:0, sets:0});
    const [perna, setPerna] = useState<{id:number, sets:number}>({id:0, sets:0});
    const [costas, setCostas] = useState<{id:number, sets:number}>({id:0, sets:0});
    const [core, setCore] = useState<{id:number, sets:number}>({id:0, sets:0});
    const [cardio, setCardio] = useState<{id:number, sets:number}>({id:0, sets:0});

    const [date, setDate] = useState<string>('');
    const [cardioDescription, setCardioDescrition] = useState<string>('');

    
    function validation(group:any): any{
        console.log(group)
        if(group.sets < 0){
            return {...group, sets:0}
        }else{
            return group
        }
    }

    useEffect(()=>{
        if(data.data.id){
           router.push({
               pathname:'/'
           })
        }
    }, [data, router])

    useEffect(()=>{
        if(router.query.editar){
            //chamar serviço e setar as variaveis
            getCall()
        }else if(router.query.calendar){
            let [d,m,y] = String(router.query.calendar).split('/')
            setDate(`${y}-${m}-${d}`)
        }else{
            let [d,m,y] = new Date().toLocaleDateString().split('/')
            setDate(`${y}-${m}-${d}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(()=>{
        //atualizar treino sets
        if(treino.data[0]?.training.length > 0 && router.query.editar){

            treino.data[0].training.map((item:ItreinoResponse)=>{
                if(item.description === 'biceps'){
                    setBiceps({id:item.id, sets:item.sets})
                }
                if(item.description === 'peitoral'){
                    setPeitoral({id:item.id, sets:item.sets})
                }
                if(item.description === 'triceps'){
                    setTriceps({id:item.id, sets:item.sets})
                }
                if(item.description === 'deltoide'){
                    setDeltoide({id:item.id, sets:item.sets})
                }
                if(item.description === 'perna'){
                    setPerna({id:item.id, sets:item.sets})
                }
                if(item.description === 'costas'){
                    setCostas({id:item.id, sets:item.sets})
                }
                if(item.description === 'core'){
                    setCore({id:item.id, sets:item.sets})
                }
                if(item.type === 2){
                    setCardioDescrition(item.description)
                    setCardio({id:item.id, sets:item.sets})
                }
               
            })

            let [d, m, y] = treino.data[0].date.split('/')
            setDate(`${y}-${m}-${d}`)
        }
    },[treino, router.query.editar]);

    function payloadHandler():any{
        let [y,m,d] = date.split('-')
        
        let payload:Iworkout = {
            training:[],
            lastTraining: false,
            date: `${d}/${m}/${y}`
        }

        const muscles = [
          {
              type: 1,
              description: 'peitoral',
              sets: peitoral.sets,
              id: peitoral.id
          },
          {
            type: 1,
            description: 'biceps',
            sets: biceps.sets,
            id: biceps.id
          },
          {
            type: 1,
            description: 'triceps',
            sets: triceps.sets,
            id: triceps.id
          },
          {
            type: 1,
            description: 'deltoide',
            sets: deltoide.sets,
            id: deltoide.id
          },
          {
            type: 1,
            description: 'perna',
            sets: perna.sets,
            id: perna.id
          },
          {
            type: 1,
            description: 'costas',
            sets: costas.sets,
            id: costas.id
          },
          {
            type: 1,
            description: 'core',
            sets: core.sets,
            id: core.id
          },
          {
            type: 2,
            description: cardioDescription,
            sets: cardio.sets,
            id: cardio.id
          },
          
        ];

        for(let i = 0; i < muscles.length; i++){
            if (muscles[i].sets != 0){
                payload.training.push(muscles[i])
            }
        }

        if(payload.training.length === 0){
            setHasError({...hasError, error:true, message: 'adicione algum treino para continuar'})
            setTimeout(()=>{
                setHasError({...hasError, error:false})
            }, 3000)
            return
        }else if((cardio.sets != 0 && cardioDescription === '') || (cardio.sets === 0 && cardioDescription != '')){
            setHasError({...hasError, error:true, message: 'adiciona qual o tipo de cardio ou quantos minutos foram feitos,  para continuar'})
            setTimeout(()=>{
                setHasError({...hasError, error:false})
            }, 3000)
            return
        }else{
            setHasError({...hasError, error:false})
        }

        return payload
    }

    async function addTraining(){
        
        let payload = await payloadHandler()
       
        postCall(payload);
    }

    async function atualizarTreino(){
        let payload = await payloadHandler();

        payload.workoutId = Number(router.query.workoutid)
        putCall(payload)

    }

    function voltarHandler(){

        if(router.query.editar){
            
            let [y,m,d] = date.split('-')
            router.push({
                pathname:'/treino',
                query:{workoutid: router.query.workoutid, calendar: `${d}/${m}/${y}`}
            })

        }else{

            router.push({
                pathname:'/'
            })

        }

    }

    useEffect(()=>{
        if(putDados.data[0]?.success){
            router.push({
                pathname:'/'
            })
        }
    },[putDados,router])

    return (
        <Fragment>

            <Card title={router.query.editar? 'editar treino' : 'adicionar treino'} containerClass=''>
                <form className="sm-mar--top"> 
                    <div className="data">
                        <div>data</div>
                        <input type="date" id="dta" value={date} onChange={(e)=>setDate(e.currentTarget.value)} />
                    </div>
                    <div className="md-mar--top">
                        <h4>musculação</h4>
                        <article className="combo-add-treino">
                            <div>peitoral</div>
                            <div className="add-serie-container">
                                <div onClick={()=>setPeitoral(validation({...peitoral, sets:peitoral.sets - 1}))}><FontAwesomeIcon icon={faCircleMinus} /></div>
                                <div>{peitoral.sets}</div>
                                <div onClick={()=>setPeitoral(validation({...peitoral, sets:peitoral.sets + 1}))}><FontAwesomeIcon icon={faCirclePlus} /></div>
                            </div>
                            <div className="align-right">series</div>
                        </article>

                        <article className="combo-add-treino">
                            <div>bíceps</div>
                            <div className="add-serie-container">
                                <div onClick={()=>setBiceps(validation({...biceps, sets:biceps.sets - 1}))}><FontAwesomeIcon icon={faCircleMinus} /></div>
                                <div>{biceps.sets}</div>
                                <div onClick={()=>setBiceps(validation({...biceps, sets:biceps.sets + 1}))}><FontAwesomeIcon icon={faCirclePlus} /></div>
                            </div>
                            <div className="align-right">series</div>
                        </article>
                        <article className="combo-add-treino">
                            <div>tríceps</div>
                            <div className="add-serie-container">
                                <div onClick={()=>setTriceps(validation({...triceps, sets:triceps.sets - 1}))}><FontAwesomeIcon icon={faCircleMinus} /></div>
                                <div>{triceps.sets}</div>
                                <div onClick={()=>setTriceps(validation({...triceps, sets:triceps.sets + 1}))}><FontAwesomeIcon icon={faCirclePlus} /></div>
                            </div>
                            <div className="align-right">series</div>
                        </article>
                        <article className="combo-add-treino">
                            <div>deltóife</div>
                            <div className="add-serie-container">
                                <div onClick={()=>setDeltoide(validation({...deltoide, sets:deltoide.sets - 1}))}><FontAwesomeIcon icon={faCircleMinus} /></div>
                                <div>{deltoide.sets}</div>
                                <div onClick={()=>setDeltoide(validation({...deltoide, sets:deltoide.sets + 1}))}><FontAwesomeIcon icon={faCirclePlus} /></div>
                            </div>
                            <div className="align-right">series</div>
                        </article>
                        <article className="combo-add-treino">
                            <div>perna</div>
                            <div className="add-serie-container">
                                <div onClick={()=>setPerna(validation({...perna, sets:perna.sets - 1}))}><FontAwesomeIcon icon={faCircleMinus} /></div>
                                <div>{perna.sets}</div>
                                <div onClick={()=>setPerna(validation({...perna, sets:perna.sets + 1}))}><FontAwesomeIcon icon={faCirclePlus} /></div>
                            </div>
                            <div className="align-right">series</div>
                        </article>
                        <article className="combo-add-treino">
                            <div>costas</div>
                            <div className="add-serie-container">
                                <div onClick={()=>setCostas(validation({...costas, sets:costas.sets - 1}))}><FontAwesomeIcon icon={faCircleMinus} /></div>
                                <div>{costas.sets}</div>
                                <div onClick={()=>setCostas(validation({...costas, sets:costas.sets + 1}))}><FontAwesomeIcon icon={faCirclePlus} /></div>
                            </div>
                            <div className="align-right">series</div>
                        </article>
                        <article className="combo-add-treino">
                            <div>core</div>
                            <div className="add-serie-container">
                                <div onClick={()=>setCore(validation({...core, sets:core.sets - 1}))}><FontAwesomeIcon icon={faCircleMinus} /></div>
                                <div>{core.sets}</div>
                                <div onClick={()=>setCore(validation({...core, sets:core.sets + 1}))}><FontAwesomeIcon icon={faCirclePlus} /></div>
                            </div>
                            <div className="align-right">series</div>
                        </article>
                    </div>
                    
                    <div className="l-mar--top sm-mar--bottom">
                        <h4>cardio</h4>
                        <article className="cardio-container__tipo">
                            <div>tipo</div>
                            <div>
                                <select value={cardioDescription} onChange={(e)=>setCardioDescrition(e.currentTarget.value)}>
                                    <option>selecione</option>
                                    <option value="esteira">esteira</option>
                                    <option value="elíptico">elíptico</option>
                                    <option value="hiit">hiit</option>
                                    <option value="corrida outdoor">corrida outdoor</option>
                                    <option value="bike">bike</option>
                                </select>
                            </div>
                        </article>
                        <article className="combo-add-cardio">
                            <div className="add-serie-container">
                                <div onClick={()=>setCardio(validation({...cardio, sets:cardio.sets - 5}))}><FontAwesomeIcon icon={faCircleMinus} /></div>
                                <div>{cardio.sets}</div>
                                <div onClick={()=>setCardio(validation({...cardio, sets:cardio.sets + 5}))}><FontAwesomeIcon icon={faCirclePlus} /></div>
                            </div>
                            <div className="align-right">minutos</div>
                        </article>
                    </div>

                </form>
                
            </Card>

            {data.loading || putDados.loading && 
            <div className="align--center" style={{color:'#7d60d3', marginBottom:'100px'}}>
                <div className="loading-ico loading-center">
                <FontAwesomeIcon icon={faSpinner} />
                </div>
            </div>}

            {hasError.error && <div className="red-alert-message">{hasError.message}</div>}
            
            {putDados.data[0]?.success && (
                <div style={{color:'green'}}>
                    {putDados.data[0].message}
                </div>
            )}
            {router.query.editar ? (
                <div className="align--center xl-mar--top">
                    <button className="secundary-btn md-mar--right" onClick={voltarHandler}>
                        <span style={{marginRight:'5px'}}>
                            <FontAwesomeIcon icon={faCircleArrowLeft} />
                        </span>
                        voltar
                    </button>
                    <button onClick={atualizarTreino}>atualizar</button>
                </div>
                
            ) : (
                <div className="align--center xl-mar--top">
                    <button className="secundary-btn md-mar--right" onClick={voltarHandler}>
                        <span style={{marginRight:'5px'}}>
                            <FontAwesomeIcon icon={faCircleArrowLeft} />
                        </span>
                        voltar
                    </button>
                    <button onClick={addTraining}>adicionar</button>
                </div>
            )}
        </Fragment>
    );
}

export default AdicionarTreino;
