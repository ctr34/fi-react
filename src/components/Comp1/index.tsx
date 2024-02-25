//import "./comp1.scss" //global import, don not use it in here
import style from "./comp1.module.scss"

const Comp = () => {
    return (
        <div className={style.box}>
            This is Comp1
        </div>   
    )
}

export default Comp