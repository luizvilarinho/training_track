import { useState } from "react";

type Props = {
    url:any;
    payload:any | null
}

const initialState = {
    data: {},
    loading: false
};

function PutHandler(props:Props){

    const [dados, setDados] = useState<any>(initialState);

    function puttCall(payloadCall?:any){
        let payload;
        if(props.payload === null){
            payload = payloadCall;
        }else{
            payload = props.payload
        }

        if(!payload) false

            setDados({...initialState, loading:true});
        
            fetch(props.url, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(payload)
            }).then(response=>{
                response.json().then((data: any)=>{
                    setDados({...{data}, loading:false});
                    console.log("DATA", data)
                })
            })

    }

    return [dados, puttCall]
}

export default PutHandler;