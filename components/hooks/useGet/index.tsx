import { useState } from "react";

type Props = {
    url:any;
}

function getHandler(props:Props){

    const [dados, setDados] = useState<any>();

    function getCall(){
    
        fetch(props.url, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        }).then(response=>{
            response.json().then((data: any)=>{
                setDados(data);
            })
        })
    }

    return [dados, getCall]
}

export default getHandler;