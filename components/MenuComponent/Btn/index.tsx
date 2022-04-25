
type Props = {
    btnName:string
}
const Btn = (props:Props)=>{
    return (
        <>
         <li>{props.btnName}</li>
        </>
    )
}

export default Btn