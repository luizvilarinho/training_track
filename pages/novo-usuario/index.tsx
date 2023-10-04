import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, {Fragment, useEffect, useState} from 'react';
import Card from '../../components/Card';
import usePost from '../../components/hooks/usePost';
import s from '../../styles/Login.module.css'
import router from "next/router";
import InlineAlert from '../../components/inlineAlert';
import { validarFormularioLogin } from '../login/loginService';


// import { Container } from './styles';

const NovoUsuario =  () => {

    const [alert, setAlert] = useState({
        show:false,
        message:''
    });

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

        if(response.data?.success === false) {
            setAlert({...alert, message:response.data.message, show:true});
        }

    }, [response])
    function sendHttpPostRequest(){
        //console.log("payload", payloadForm)
         let message = validarFormularioLogin(payloadForm);
        if(message){
            setAlert({...alert, message, show:true});
            return
        }
        
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
                        <input type="text" onChange={(e)=>setPayloadForm({... payloadForm , name:e.currentTarget.value})} id="nome" className="" placeholder="preencha seu nome" maxLength={50}/>

                    </div>
                    <div className="md-mar--top">
                        <label htmlFor="email" className={s.w100}>Email</label>
                        <input type="text" onChange={(e)=>setPayloadForm({... payloadForm , email:e.currentTarget.value.toLocaleLowerCase()})} id="email" className="" placeholder="preencha seu email"  maxLength={50}/>

                    </div>
                    <div className="l-mar--top md-mar--bottom">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" onChange={(e)=>setPayloadForm({... payloadForm , password:e.currentTarget.value.toLocaleLowerCase()})} className="" placeholder="preencha a sua senha" maxLength={8} minLength={3} />

                    </div>

                    <div>
                    
                        <InlineAlert show={alert.show} mensagem={alert.message} />
                    </div>

            </Card>

            <div className="align--center xl-mar--top">
                <button onClick={sendHttpPostRequest}>Login</button>
            </div>

        </div>
    );
}

export default NovoUsuario;
