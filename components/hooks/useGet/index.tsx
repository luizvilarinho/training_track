import { useState } from "react";

type Props = {
    url:any;
}
const inicialValues = {
    data:{},
    loading:false
}

function getHandler(props:Props){

    const [dados, setDados] = useState<any>(inicialValues);
    
    function getCall(){
        
        setDados({...inicialValues, loading:true})
            fetch(props.url, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            }).then(response=>{
                response.json().then((resp: any)=>{
                    setDados({...dados,data:resp, loading:false});
                })
            })

    }

    return [dados, getCall]
}

export default getHandler;