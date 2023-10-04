import { useRouter } from "next/router";
import Card from "../../components/Card";
import useGet from "../../components/hooks/useGet";
import { useEffect } from "react";
import stylecard from "../../components/Card/stylecard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

 const RecuperarCredenciais = () => {
    const router = useRouter();

    const [emailResponse, emailSend] = useGet({url: `${process.env.NEXT_PUBLIC_LOGIN}/alterar-senha?email=${router.query.email}`});

    useEffect(()=>{
        emailSend()
    }, []);

    useEffect(()=>{
        console.log("emailResponse", emailResponse.data)
    },[emailResponse])

    return (
        <Card title="Recuperar Credenciais">
            <div className={stylecard.recuperarCredenciais} style={{textAlign:'center'}}>

            {emailResponse.loading ?
                    (<div className="loading-ico loading-center">
                        <FontAwesomeIcon icon={faSpinner} />
                    </div>) 

                        : 

                    (<div>
                        {emailResponse.data && emailResponse.data.length > 0 && (
                           <div>{emailResponse.data[0].mensagem}</div>
                       )}
                    </div>)
                  }

               

            </div>
        </Card>
    )
}

export default RecuperarCredenciais;