import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Card from '../../components/Card';
import usePost from '../../components/hooks/usePost';
import s from '../../styles/Login.module.css'
import { emailPass, validarFormularioLogin } from '../../services/loginService';
import InlineAlert from '../../components/inlineAlert';
import { Modal } from '../../components/Modal';

function Login(){

    
    const [payloadForm, setPayloadForm] = useState({
        email:'',
        password: ''
    });
    
    const [alert, setAlert] = useState({
        show:false,
        message:''
    });

    const [modalConfig, setModalConfig] = useState({
       
        closeModal: () => {
            setModalConfig({...modalConfig, open:false})
        },
        open:false,
        title: "Deseja registrar uma nova senha?",
        itemSelectedId:payloadForm.email
    })

    const [response, httpPost] = usePost({url:process.env.NEXT_PUBLIC_LOGIN, payload:payloadForm})

    useEffect(()=>{
        console.log("RESPONSE", response, response.data?.success);
        if(response.data?.success){
            router.push({
                pathname:'/'
            })
        }
        if(response.data?.success === false) {
            setAlert({...alert, message:response.data.message, show:true});
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[response]);
    
    function sendHttpPostRequest(){
        //console.log("payload", payloadForm)
        let message = validarFormularioLogin(payloadForm);
        if(message){
            setAlert({...alert, message, show:true});
            return
        }

        httpPost();
    }

    function forgotPassword(){
        router.push('/recuperar-credenciais?email='+payloadForm.email);
    }

    function openModalDelete(){
        window.scrollTo({left:0, top:0});
        setModalConfig({...modalConfig,open:true, })
      }

    return (
        <>
        <Modal exec={forgotPassword} open={modalConfig.open} title={modalConfig.title} closeModal={modalConfig.closeModal}/>
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
                    <div className={s.loginMenu}>
                        <Link href="./novo-usuario">
                            Novo Usuário
                        </Link>
                    </div>
                    {/* <div className={s.loginMenu}>Recuperação de senha</div> */}
                </div>
            </section>

            <Card title="Login" containerClass=''>
                    <div className="md-mar--top">
                        <label htmlFor="email" className={s.w100}>Email</label>
                        <input type="text" onChange={(e)=>setPayloadForm({... payloadForm , email:e.currentTarget.value.toLocaleLowerCase()})} id="email" className="" placeholder="preencha seu email" maxLength={50} />

                    </div>
                    <div className="l-mar--top md-mar--bottom">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" onChange={(e)=>setPayloadForm({... payloadForm , password:e.currentTarget.value.toLocaleLowerCase()})} className="" placeholder="preencha a sua senha" minLength={3} maxLength={8} />

                    </div>
                    <div className='esqueci' hidden={emailPass(payloadForm.email)}>
                        <span onClick={()=>openModalDelete()}>esqueci minha senha</span>
                    </div>

                    <div>
                       <InlineAlert show={alert.show} mensagem={alert.message} />
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