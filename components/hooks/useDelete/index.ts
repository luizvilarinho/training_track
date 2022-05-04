import { useState } from "react";

type Props = {
    url:any;
}

const initialState = {
    data: [],
    loading: false
};

function deleteHandler(props:Props){

    const [dados, setDados] = useState<any>(initialState);

    function deleteCall(){

            setDados({...initialState, loading:true});
        
            fetch(props.url, {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            }).then(response=>{
                response.json().then((data: any)=>{
                    setDados({...dados, data, loading:false});
                    console.log("DATA", data)
                })
            })

    }

    return [dados, deleteCall]
}

export default deleteHandler;