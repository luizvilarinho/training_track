import { useState } from "react";
import { useRouter } from "next/router";

type Props = {
    url:any;
    payload:any | null
}

const initialState = {
    data: {},
    loading: false
};

function PostHandler(props:Props){

    const router = useRouter()
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
            credentials: 'include',
            body:JSON.stringify(payload)
            }).then(response=>{
                if(response.status === 401 || response.status === 500){
                    router.push({ pathname: '/login' });
                    return;
                }
                response.json().then((data: any)=>{
                    setDados({...dados, data, loading:false});
                })
            })

    }

    return [dados, postCall]
}

export default PostHandler;