import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import InlineAlert from "../../components/inlineAlert";
import { novaSenhaIsValid } from "./novaSenhaService";
import usePost from "../../components/hooks/usePost";

const NovaSenha = () => {

    const router = useRouter();
    const rash = router.query.hash;

    const [payloadForm, setPayloadForm] = useState<{password:string, secondPassword:string}>({
        password: '',
        secondPassword: '',
    });

    const [alert, setAlert] = useState({
        show:false,
        message:''
    });

    const [updatePasswordResponse, updatePasswordRequest] = usePost({url: `${process.env.NEXT_PUBLIC_LOGIN}/alterar-senha?hash=${rash}`, payload:payloadForm});

    useEffect(() => {
        console.log("updatePasswordResponse", updatePasswordResponse)
        if (updatePasswordResponse && updatePasswordResponse?.data?.result?.success) {
            router.push('/login')
        }
    }, [updatePasswordResponse]);
    
    function gravarNovaSenhaHandler(){
        //console.log("payload", payloadForm)
        if(novaSenhaIsValid(payloadForm)){
            let message = novaSenhaIsValid(payloadForm)?.error || ''
            setAlert({...alert, message, show:true});
            return
        }

        updatePasswordRequest(payloadForm);
    }

    return (
        <div>
           <Card title="Nova Senha">
                <div className="l-mar--top md-mar--bottom">
                    <label htmlFor="senha">Nova senha</label>
                    <input 
                    type="password" 
                    autoComplete="off"
                    id="senha" 
                    onChange={(e)=>setPayloadForm({... payloadForm , password:e.currentTarget.value.toLocaleLowerCase()})} className="" 
                    placeholder="nova senha" 
                    minLength={3} 
                    maxLength={8} />
                </div>
                <div className="l-mar--top md-mar--bottom">
                    <label htmlFor="senha">confirmar nova senha</label>
                    <input 
                    type="password" 
                    autoComplete="off"
                    id="senha"
                     onChange={(e)=>setPayloadForm({... payloadForm , secondPassword:e.currentTarget.value.toLocaleLowerCase()})} 
                     className="" 
                     placeholder="redigite a nova senha"
                      minLength={3} 
                      maxLength={8} />
                </div>

                <div>
                    <InlineAlert show={alert.show} mensagem={alert.message} />
                </div>
               
                <div className="align--center xl-mar--top md-mar--bottom">
                     <button 
                     disabled={!payloadForm.password || !payloadForm.secondPassword}
                     onClick={gravarNovaSenhaHandler}>gravar nova senha</button>
                </div>
           </Card>
        </div>
    )
}

export default NovaSenha;