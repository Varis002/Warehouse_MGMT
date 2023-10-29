import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar({ onSearch , input}) {

  const handleSearch = (e) => {
    const term = e.target.value;
    onSearch(term);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <span className="navbar-brand" href="#">
        StockArea
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mr-auto ">
          <NavLink to={"/"} className="nav-item">
            WareHouse
          </NavLink>
        </ul>
        {input?<form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2 searchBar"
            type="search"
            placeholder="Name,city,cluster,space"
            aria-label="Search"
            onChange={handleSearch}
          />
          <button
            className="btn btn-outline-secondary my-2 my-sm-0 button"
            type="button"
          >
            <i className="fa-solid fa-magnifying-glass"></i>Search
          </button>
        </form>:('')}
      </div>
    </nav>
  );
}

export default Navbar;
