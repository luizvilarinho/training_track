import { useRouter } from 'next/router'

type Props = {
    btnName:string
    href: string
}
const Btn = (props:Props)=>{

    const router = useRouter();

    const handlerLink = (e:any)=>{
        e.preventDefault()
        router.push(props.href)

    }

    return (
        <>
         <li onClick={handlerLink}>{props.btnName}</li>
        </>
    )
}

export default Btn