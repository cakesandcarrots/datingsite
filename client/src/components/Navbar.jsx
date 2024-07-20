import "../styling/Navbar.css"
function Navbar() {
  return (
<>
<div className="navbarbuttonscontainer">
    <button className="navbarbuttons dashboard" >Dashboard</button>
    <button className="navbarbuttons matchmaker">Match<span className="maker">Maker</span></button>
    <button className="navbarbuttons login">Log In</button>
    <button className="navbarbuttons signup">Sign Up</button>
</div>


</>
  )
}

export default Navbar