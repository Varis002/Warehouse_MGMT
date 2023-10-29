import React from "react";
import './List.css';
import { useNavigate } from 'react-router-dom';

function List(props) {

    const navigate = useNavigate();

    const handleDetails=(id)=>{
        navigate(`/warehouse/details/${id}`);
    }
    
  return (
    <div className="row Row text-center py-4 px-1 my-3" onClick={() => handleDetails(props.info._id)}>
      <div className="col">{props.info.id}</div>
      <div className="col">{props.info.name}</div>
      <div className="col">{props.info.code}</div>
      <div className="col">{props.info.cluster}</div>
      <div className="col">{props.info.city}</div>
      <div className="col">{props.info.space_available}</div>
      <div className="col">{props.info.is_live?'Yes':'No'}</div>
      <div className="col">{props.info.type}</div>
    </div>
  );
}

export default List;
