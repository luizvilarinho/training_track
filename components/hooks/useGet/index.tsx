import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
    url:any;
}
const inicialValues = {
    data:[],
    loading:false
}

function GetHandler(props:Props){

    const router = useRouter()
    const [dados, setDados] = useState<any>(inicialValues);
    
    function getCall(){
        setDados({...inicialValues, loading:true});

            fetch(props.url, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
            }).then(response=>{
                if(response.status === 401 || response.status === 500){
                    router.push({
                        pathname:'/login'
                    })

                    return 
                }

                response.json().then((resp: any)=>{
                    setDados({...dados,data:[...resp], loading:false});
                    
                })
            }).finally(()=>console.log("DADOS",dados))

    }

    return [dados, getCall]
}

export default GetHandler;
