import guy from "../assests/guy.png";
import girl from "../assests/girl.png";
import bigheart from "../assests/bigheart.png";
import left from "../assests/left.png";
import right from "../assests/right.png";

function Couple() {
  return (
    <div className="pl-6 flex justify-around pt-8 gap-0 relative overflow-hidden">
      <img className="h-120 z-10 overflow-hidden animate-slide-in-right" src={guy} alt="" />
      <img className="animate-combined xl:size-[30%]" src={bigheart} alt="" />

      <img className="h-120 animate-slide-in-left " src={girl} alt="" />
      <img className="absolute h-48 left-0 top-80" src={left} alt="" />
      <img className="absolute h-40 xl:left-[68rem] xl:top-88 2xl:left-[72rem]" src={right} alt="" />
      <div className="h-4 w-full right-0 bottom-0 absolute bg-[#FFE1A6] z-[-1]"></div>
    </div>
  );
}

export default Couple;
