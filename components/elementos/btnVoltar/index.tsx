import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";

const BtnVoltar: React.FC = () => {

    function voltarHandler(){
        router.push({
            pathname:'/'
        })
    }
    
    return (
        <>
           <div className="buttons-container align--center xl-mar--top md-mar--bottom" >
                <button className="secundary-btn md-mar--bottom" onClick={voltarHandler}>
                    <span style={{marginRight:'5px'}}>
                        <FontAwesomeIcon icon={faCircleArrowLeft} />
                    </span>
                    voltar
                </button>
            </div>
        </>
    )
}

export default BtnVoltar;