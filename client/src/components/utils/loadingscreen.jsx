import Loader from "react-loader-spinner";

export default function Loadingscreen(){
    
    return(
        <div className="loading_container">
            <Loader 
                style={{marginTop: "110px"}} 
                type="Oval" 
                color="#63235A"
                height={180} width={180}
            />
        </div>
    )
}