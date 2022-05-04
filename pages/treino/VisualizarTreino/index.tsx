import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Card from '../../../components/Card';
import Group from '../../../components/Destaque/Group';
import useGet from '../../../components/hooks/useGet';
import Image from 'next/image'
import calendar from "../../../public/assets/img/i_schedule_school_date_time.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRotateBackward, faBackspace, faBackward, faCircleArrowLeft, faDeleteLeft, faSpinner, faStepBackward, faTrash, faTrashAlt, faTrashCan, faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import useDelete from '../../../components/hooks/useDelete';


const VisualizarTreino: React.FC = (props) => {

    const router = useRouter();

    const [searchDate, setSearchDate] = useState<string>('')
    const [dados, getCall] = useGet({url: `${process.env.NEXT_PUBLIC_GETTRANING}?workoutid=${router.query.workoutid}`})
    const [deleteDados, deleteCall] = useDelete({url: `${process.env.NEXT_PUBLIC_GETTRANING}/${router.query.workoutid}`})

    useEffect(()=>{
        getCall()
    },[])

    function editHandler(){
        router.push({
            pathname:'/treino',
            query: {workoutid: router.query.workoutid, editar: true}
        })
    }

    function deleteHandler(){
        deleteCall();
    }

    useEffect(()=>{
        if(deleteDados.data.length > 0 && deleteDados.data[0].success){
            router.push({
                pathname:'/',
                query: {workoutid: router.query.workoutid, editar: true}
            })
        }
    }, [deleteDados])

  return (
      <Fragment>
          <div className="search-container md-mar--bottom">
            <label className="sm-mar--bottom">Pesquisar por data</label>
            <input type="date" value={searchDate} onChange={(e)=>setSearchDate(e.currentTarget.value)} placeholder='pesquisar por data' />
            <button className={searchDate === '' ? 'secundary-btn' : ''}>ok</button>
          </div>
          <Card title={`treino`} containerClass=''>
            {dados.loading || deleteDados.loading? 
                <div className="loading-center">
                    <div className="loading-ico">
                        <FontAwesomeIcon icon={faSpinner} />
                    </div>
                </div>
                :
                <div>
                    <h4>
                    <Image src={calendar} width={30} height={30} />
                    {router.query.calendar}
                </h4>
                
                {dados.data.length > 0 && dados.data[0].training.map((treino:any, idx:number)=>{
                    return (
                        <div key={idx}>
                            <Group muscle={treino.description} sets={treino.sets} isCardio={treino.type === 2? true : false} width="full-width" />
                        </div>
                    )
                })}
                </div>
                }
            
                <div className="buttons-container align--center xl-mar--top">
                    <button onClick={editHandler}>editar</button>
                    <button onClick={deleteHandler} className="secundary-btn">
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
          </Card>
           
          <div className="buttons-container align--center xl-mar--top">
                    <button className="secundary-btn">
                        <span style={{marginRight:'5px'}}>
                            <FontAwesomeIcon icon={faCircleArrowLeft} />

                        </span>
                     voltar</button>
                </div>
      </Fragment>
  );
}

export default VisualizarTreino;