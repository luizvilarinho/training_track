import { faCircleExclamation, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Card from '../../components/Card';
import usePost from '../../components/hooks/usePost';
import s from '../../styles/Login.module.css'

function Login(){

    const [payloadForm, setPayloadForm] = useState({
        email:'',
        password: ''
    });

    const [response, httpPost] = usePost({url:process.env.NEXT_PUBLIC_LOGIN, payload:payloadForm})

    useEffect(()=>{
        console.log("RESPONSE", response);
        if(response.data?.success){
            router.push('/')
        } 
        
    },[response]);
    
    function sendHttpPostRequest(){
        //console.log("payload", payloadForm)
        httpPost();
    }

    return (
        <>
        {response.loading && (
            <Fragment>
                <div className="loading">
                    <div className="loading-ico">
                        <FontAwesomeIcon icon={faSpinner} />
                    </div>
                </div>
            </Fragment>
        )}
       
        <div className="main">
            <section id="top-alert">
                <div className={s.flex}>
                    <div className={s.loginMenu}>Novo Usuário</div>
                    <div className={s.loginMenu}>Recuperação de senha</div>
                </div>
            </section>

            <Card title="Login" containerClass=''>
                    <div className="md-mar--top">
                        <label htmlFor="email" className={s.w100}>Email</label>
                        <input type="text" onChange={(e)=>setPayloadForm({... payloadForm , email:e.currentTarget.value})} id="email" className="" placeholder="preencha seu email" />

                    </div>
                    <div className="l-mar--top md-mar--bottom">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" onChange={(e)=>setPayloadForm({... payloadForm , password:e.currentTarget.value})} className="" placeholder="preencha a sua senha" />

                    </div>

                    <div>
                    
                        {response?.success === false && (
                            <Fragment>
                                <div className="red-alert-message">
                                    <FontAwesomeIcon icon={faCircleExclamation} />
                                    <span style={{marginLeft:'10px'}}>{response.message}</span>
                                </div>
                                
                            </Fragment>
                        )}
                    </div>

            </Card>

            <div className="align--center xl-mar--top">
                <button onClick={sendHttpPostRequest}>Login</button>
            </div>

        </div>
        </>
    )
}

export default Login;