import leftheart from "../assests/leftheart.png";
import leftcloud from "../assests/leftloon.png";
import righheart from "../assests/rightheart.png";
import rightcloud from "../assests/rightloon.png";

function Tagline() {
  return (
    <div className="pt-20 flex relative">
      <div className="flex-1 ">
        <img className=" max-w-none relative h-32 left-24 top-24 z-10" src={leftheart} alt="" />
        <img className=" max-w-none  relative bottom-4 h-40" src={leftcloud} alt="" />
      </div>
      <div className="flex-4 flex flex-col items-center">
        <div className="font-truenorg text-7xl font-bold">
          Find Your <span className="text-[#ffb4b4]">Real Connection</span>
        </div>
        <div className="font-aileron leading-8 text-center text-lg pt-4 w-4/5">
          We are dedicated to connecting hearts daily, and we firmly believe
          in our expertise to do so, uniting single individuals in enduring
          and meaningful partnerships that stand the test of time.
        </div>
        <img className=" relative h-36 pl-[40%] left-40 " src={righheart} alt="" />
        <button className="bg-[#ffb3b3] bottom-28 right-8 relative text-black py-6 px-10 text-xl font-bold border border-black cursor-pointer text-center inline-block transition-all duration-300 ease-in-out relative shadow-[5px_5px_0px_rgb(0,_0,_0)] hover:bg-[#ff9999] active:shadow-sm active:transform active:translate-x-1 active:translate-y-1">
          Join MatchMaker
        </button>
      </div>
      <div className="flex-1 relative">
        <img className=" relative h-32 top-1/2 max-w-none overflow-hidden" src={rightcloud} alt="" />
      </div>
    </div>
  );
}

export default Tagline;
