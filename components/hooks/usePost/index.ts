import { useState } from "react";

type Props = {
    url:any;
    payload:any | null
}

const initialState = {
    data: {},
    loading: false
};

function PostHandler(props:Props){

    const [dados, setDados] = useState<any>(initialState);

    function postCall(payloadCall?:any){
        let payload;
        if(props.payload === null){
            payload = payloadCall;
        }else{
            payload = props.payload
        }

        if(!payload) false

        setDados({...initialState, loading:true});
        

            fetch(props.url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(payload)
            }).then(response=>{
                response.json().then((data: any)=>{
                    setDados({...dados, data, loading:false});
                })
            })

    }

    return [dados, postCall]
}

export default PostHandler;