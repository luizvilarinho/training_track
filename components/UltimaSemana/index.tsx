import { FunctionComponent, useEffect } from "react";
import Lista from "../Lista";
import useGet from "../hooks/useGet";

interface UltimaSemanaProps {
    
}
 
const UltimaSemana: FunctionComponent<UltimaSemanaProps> = () => {

    const [treinosSemana, getTreinosSemana] = useGet({url: process.env.NEXT_PUBLIC_ULTIMASEMANA});

    useEffect(() => {
        getTreinosSemana();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    function treinoSemanaRender(treinosSemana:{[exercicio:string]:{sets:number, type:number}}){
        let template:any =[]
        for(let keyTreino in treinosSemana){
           
            if(keyTreino != 'cardio'){
                console.log(template.length)
                template.push(<Lista key={treinosSemana[keyTreino].sets} muscle={keyTreino} sets={treinosSemana[keyTreino].sets} />)
            }
        }

        if(treinosSemana.cardio){
            console.log(template.length)
           template.push(
            (
                <div className="sm-mar--top">
                    <Lista key={treinosSemana['cardio'].sets} muscle={'cardio'} sets={treinosSemana['cardio'].sets} />
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