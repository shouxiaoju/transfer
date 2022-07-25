
import useCountDown from "./usetime"


const Timer=()=>{
 
    const [seconds]=useCountDown(10)
    return (
        <div>
            倒计时:{seconds}
        </div>
    )
}
export default Timer