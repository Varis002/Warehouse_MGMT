import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config.js";
import List from "../components/List.js";
import "./Home.css";
import Navbar from "../components/Navbar";

function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const getData = async () => {
    try {
      const warehouseList = await axios.get(`${BASE_URL}/warehouse/data`);
      warehouseList.data.data.sort((a, b) => a.id - b.id);
      setData(warehouseList.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredData = data.filter(
      (warehouse) =>
        warehouse.name.toLowerCase().includes(term.toLowerCase()) ||
        warehouse.city.toLowerCase().includes(term.toLowerCase()) ||
        warehouse.cluster.toLowerCase().includes(term.toLowerCase()) ||
        String(warehouse.space_available).includes(term)
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar onSearch={handleSearch} input={true} />
      <div className="container-fluid">
        <div className="row tHead text-center text-light py-4 px-1">
          <div className="col">Id</div>
          <div className="col">Name</div>
          <div className="col">Code</div>
          <div className="col">Cluster</div>
          <div className="col">City</div>
          <div className="col">Space</div>
          <div className="col">Live</div>
          <div className="col">Type</div>
        </div>
        {searchTerm
          ? filteredData.map((warehouse) => (
              <List key={warehouse.id} info={warehouse} />
            ))
          : data.map((warehouse) => (
              <List key={warehouse.id} info={warehouse} />
            ))}
      </div>
    </div>
  );
}

export default Home;
