import { FunctionComponent, useEffect } from "react";
import Lista from "../Lista";
import useGet from "../hooks/useGet";

interface UltimaSemanaProps {
    
}
 
const UltimaSemana: FunctionComponent<UltimaSemanaProps> = () => {

    const [treinosSemana, getTreinosSemana] = useGet({url: process.env.NEXT_PUBLIC_ULTIMASEMANA});

    useEffect(() => {
        getTreinosSemana();
        
    }, [])

    useEffect(() => {
        console.log("TREINOSEMANA", treinosSemana)
    },[treinosSemana])

    function treinoSemanaRender(treinosSemana:{[exercicio:string]:{sets:number, type:number}}){
        let template:any =[]
        for(let keyTreino in treinosSemana){
            //console.log(keyTreino)
            if(keyTreino != 'cardio'){
                template.push(<Lista muscle={keyTreino} sets={treinosSemana[keyTreino].sets} />)
            }
        }

        if(treinosSemana.cardio){
           template.push(
            (
                <div className="sm-mar--top">
                    <Lista muscle={'cardio'} sets={treinosSemana['cardio'].sets} />
                </div>
            )
           )
        }

        return (template)
    }

    return ( 
        <>
            {treinosSemana?.data[0]?.success? (
                treinoSemanaRender(treinosSemana.data[0].treinoSemana)
                ) : "..." }
         
            
        </>
     );
}
 
export default UltimaSemana;