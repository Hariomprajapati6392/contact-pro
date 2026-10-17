import React,{useEffect,useState} from "react";
import { Link, useNavigate } from "react-router";
import { UserRound,Search} from "lucide-react";

const Header = (props) => {
  const {search, setSearch}=props;
const [name, setName] = useState("Admin");
const usenavigate=useNavigate()

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(
          "http://localhost:3000/api/users/me",
          { 
            method:"GET",
            credentials: "include" 
          }
        );

        if (!res.ok) return;

        const data = await res.json();
        setName(data.name);
      } catch (err) {
        console.error(err);
      }
    }

    getUser();
  }, []);

async function handleLogout(){
  try {
        const res = await fetch(
          "http://localhost:3000/api/users/logout",
          { 
            method:"GET",
            credentials: "include" 
          }
        );

        if (!res.ok) return;
        const data = await res.json();
        alert(data.message)
        usenavigate("/")
      } catch (err) {
        return alert(err);
      }
}

function handleChange(e) {
  if (typeof setSearch === "function") {
    setSearch(e.target.value);
  }
}


  return (
    <header className="navbar">
      <div className="logo">
        <span className="logo-icon">C</span>
        <span>Contact Pro</span>
      </div>

      <div className="search">
        <span className="search-icon"><Search /></span>
        <input
         type="text"
         placeholder="Search by name or city..."
          value={search || ""}
          onChange={handleChange}
         />
      </div>

      <div className="navbar-actions">
       
        <Link to="/addcontact" className="add-contact" >Add Contact</Link>

        <div className="navbar-right">
          <span className="user-icon"><UserRound /></span>
          <span className="user-name">{name}</span>
        </div>

        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>

    </header>
  );
};

export default Header;

