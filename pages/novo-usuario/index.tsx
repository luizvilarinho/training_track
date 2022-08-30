import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, {Fragment, useEffect, useState} from 'react';
import Card from '../../components/Card';
import usePost from '../../components/hooks/usePost';
import s from '../../styles/Login.module.css'
import router from "next/router";


// import { Container } from './styles';

const NovoUsuario =  () => {

    const [payloadForm, setPayloadForm] = useState({
        email:'',
        password: '',
        name:''
    });

    const [typeInputPassword, setTypeInputPassword] = useState();

    const [response, httpPost] = usePost({url:process.env.NEXT_PUBLIC_CREATE_USER, payload:payloadForm})

    useEffect(()=>{
        //console.log("RESPONSE", response)
        if(response.data?.success === true){
            router.push('/login')
        }
    }, [response])
    function sendHttpPostRequest(){
        //console.log("payload", payloadForm)
        httpPost();
    }
    
    return (
        <div className="main">
            <section id="top-alert">
                <div className={s.flex}>
                    <div className={s.loginMenu}>
                        <Link href="./login">
                            Login
                        </Link>
                    </div>
                    {/* <div className={s.loginMenu}>Recuperação de senha</div> */}
                </div>
            </section>

            <Card title="novo usuário" containerClass=''>
                    <div className="md-mar--top">
                        <label htmlFor="nome" className={s.w100}>Nome</label>
                        <input type="text" onChange={(e)=>setPayloadForm({... payloadForm , name:e.currentTarget.value})} id="nome" className="" placeholder="preencha seu nome" />

                    </div>
                    <div className="md-mar--top">
                        <label htmlFor="email" className={s.w100}>Email</label>
                        <input type="text" onChange={(e)=>setPayloadForm({... payloadForm , email:e.currentTarget.value})} id="email" className="" placeholder="preencha seu email" />

                    </div>
                    <div className="l-mar--top md-mar--bottom">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" onChange={(e)=>setPayloadForm({... payloadForm , password:e.currentTarget.value})} className="" placeholder="preencha a sua senha" />

                    </div>

                    <div>
                    
                        {response?.data.success === false && (
                            <Fragment>
                                <div className="red-alert-message">
                                    <FontAwesomeIcon icon={faCircleExclamation} />
                                    <span style={{marginLeft:'10px'}}>{response.data.message}</span>
                                </div>
                                
                            </Fragment>
                        )}
                    </div>

            </Card>

            <div className="align--center xl-mar--top">
                <button onClick={sendHttpPostRequest}>Login</button>
            </div>

        </div>
    );
}

export default NovoUsuario;
