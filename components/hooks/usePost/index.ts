import { useState } from "react";

type Props = {
    url:any;
    payload:any
}

const initialState = {
    data: {},
    loading: false
};

function postHandler(props:Props){

    const [dados, setDados] = useState<any>(initialState);

    function postCall(){
        
        if(!props.payload) false

        setDados({...initialState, loading:true});
        

            fetch(props.url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(props.payload)
            }).then(response=>{
                response.json().then((data: any)=>{
                    //console.log("DATA", data)
                    setDados({...{data}, loading:false});
                })
            })

    }

    return [dados, postCall]
}

export default postHandler;