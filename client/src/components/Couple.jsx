import guy from "../assests/guy.png"
import girl from "../assests/girl.png"
import bigheart from "../assests/bigheart.png"
import left from "../assests/left.png"
import right from "../assests/right.png"
import "../styling/Couple.css"
function Couple() {
  return (
    <>
    <div className = "couplecontainer">
        <img className = "guy" src={guy} alt="" />
        <img  className = "bigheart "src={bigheart} alt="" />
        <img className= " girl " src={girl} alt="" />
        <img className="left" src={left} alt="" />
        <img className="right" src={right} alt="" />
        <div className="coupleground"></div>

    </div>



    </>
  )
}

export default Couple