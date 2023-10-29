import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config.js";
import axios from "axios";
import "./Details.css";
import Modals from "../components/Modals.js";
import Navbar from "../components/Navbar.js";

function Details() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getData = async () => {
    try {
      const wareHouse = await axios.get(`${BASE_URL}/warehouse/details/${id}`);
      setData(wareHouse.data.data);
    } catch (error) {
      console.log("Error getting data: " + error);
    }
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`${BASE_URL}/warehouse/update/${id}`, data);
      getData();
      setEditMode(false);
    } catch (error) {
      console.error("Error saving data: " + error);
    }
  };

  useEffect(() => {
    getData(id);
  }, []);

  return (
    <div>
      <Navbar input={false} />
      {data ? (
        <div className="text-center">
          <h1>
            Details of {data.name}{" "}
            <i
              className="fa-solid fa-pen-to-square h3"
              onClick={handleEdit}
            ></i>
          </h1>
          <div className="main-data-div h3">
            <div className="row text-center mb-3">
              <div className="col-4 text-right">Id :</div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control d-inline-block w-100"
                  readOnly={!editMode}
                  onChange={(e) => setData({ ...data, id: e.target.value })}
                  value={data.id}
                />
              </div>
            </div>
            <div className="row text-center mb-3">
              <div className="col-4 text-right">Code :</div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control d-inline-block w-100"
                  readOnly={!editMode}
                  onChange={(e) => setData({ ...data, code: e.target.value })}
                  value={data.code}
                />
              </div>
            </div>
            <div className="row text-center mb-3">
              <div className="col-4 text-right">Cluster :</div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control d-inline-block w-100"
                  readOnly={!editMode}
                  onChange={(e) =>
                    setData({ ...data, cluster: e.target.value })
                  }
                  value={data.cluster}
                />
              </div>
            </div>
            <div className="row text-center mb-3">
              <div className="col-4 text-right">Name :</div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control d-inline-block w-100"
                  readOnly={!editMode}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  value={data.name}
                />
              </div>
            </div>
            <div className="row text-center mb-3">
              <div className="col-4 text-right">City :</div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control d-inline-block w-100"
                  readOnly={!editMode}
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                  value={data.city}
                />
              </div>
            </div>
            <div className="row text-center mb-3">
              <div className="col-4 text-right">Live :</div>
              <div className="col-6">
                <select
                  className="form-control d-inline-block w-100"
                  disabled={!editMode}
                  onChange={(e) =>
                    setData({ ...data, is_live: e.target.value === "Yes" })
                  }
                  value={data.is_live ? "Yes" : "No"}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="row text-center mb-3">
              <div className="col-4 text-right">Registered :</div>
              <div className="col-6">
                <select
                  className="form-control d-inline-block w-100"
                  disabled={!editMode}
                  onChange={(e) =>
                    setData({
                      ...data,
                      is_registered: e.target.value === "Yes",
                    })
                  }
                  value={data.is_registered ? "Yes" : "No"}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="row text-center mb-3">
              <div className="col-4 text-right">Space :</div>
              <div className="col-6">
                <input
                  type="number"
                  className="form-control d-inline-block w-100"
                  readOnly={!editMode}
                  onChange={(e) =>
                    setData({ ...data, space_available: e.target.value })
                  }
                  value={data.space_available}
                />
              </div>
            </div>
            <div className="row text-center mb-3">
              <div className="col-4 text-right">Type :</div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control d-inline-block w-100"
                  readOnly={!editMode}
                  onChange={(e) => setData({ ...data, type: e.target.value })}
                  value={data.type}
                />
              </div>
            </div>
            {data.customFields && data.customFields.length > 0 ? (
              <>
                {data.customFields.map((customFeild, index) => {
                  return (
                    <div className="row text-center mb-3">
                      <div className="col-4 text-right">
                        {customFeild.fieldName} :
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control d-inline-block w-100"
                          readOnly={!editMode}
                          onChange={(e) => {
                            const updatedCustomFields = [...data.customFields];
                            updatedCustomFields[index] = {
                              ...updatedCustomFields[index],
                              fieldValue: e.target.value,
                            };
                            setData({
                              ...data,
                              customFields: updatedCustomFields,
                            });
                          }}
                          value={
                            typeof customFeild.fieldValue === "boolean"
                              ? (customFeild.fieldValue
                                ? "Yes"
                                : "No")
                              : customFeild.fieldValue
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="mt-3">No Custom Fields Present</div>
            )}
            {editMode ? (
              <button className="btn btn-success" onClick={handleSaveClick}>
                Save
              </button>
            ) : null}
          </div>
          <Modals show={show} onHide={handleClose} />
          <button
            className="btn btn-outline-dark mt-2 mb-5"
            onClick={handleShow}
          >
            Add Custom Feild
          </button>
        </div>
      ) : (
        <>
          <div>Error loading</div>
        </>
      )}
    </div>
  );
}

export default Details;
