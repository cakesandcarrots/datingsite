import "../styling/Tagline.css";
import leftheart from "../assests/leftheart.png"
import leftcloud from "../assests/leftloon.png"
import righheart from "../assests/rightheart.png"
import rightcloud from "../assests/rightloon.png"
function Tagline() {
  return (
    <>
      <div className = "Taglinecontainer" >
        <div className= "Taglineleft">
        <img className= "leftheart" src={leftheart} alt="" />
        <img className="leftcloud" src={leftcloud} alt="" />
        </div>
        <div className = " Taglinemiddle">
          <div className = " Taglineheading">Find Your <span className="realconnections">Real Connections</span></div>
          <div className= "Taglinedescription">
            We are dedicated to connecting hearts daily, and we firmly believe
            in our expertise to do so, uniting single individuals in enduring
            and meaningful partnerships that stand the test of time.
          </div>
          <img className= "rightheart" src={righheart} alt="" />

          <button className= "Taglinebutton">Join MatchMaker</button>
        </div>
        <div className= "Taglineright">
          <img  className="rightcloud"src={rightcloud} alt="" />
        </div>
      </div>
    </>
  );
}

export default Tagline;
