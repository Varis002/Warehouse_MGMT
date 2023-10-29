import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";

function Modals({ show, onHide }) {

  const {id}= useParams()

  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("text");
  const [fieldValue, setFieldValue] = useState("");
  const hideHandler =()=>{
    setFieldName("");
    setFieldType("text");
    setFieldValue("");
    onHide();
  }

  const saveData = async()=>{
    try {
      await axios.post(`${BASE_URL}/warehouse/custom/${id}`,{fieldName,fieldValue})
      onHide();
      window.location.reload();
    } catch (error) {
      console.error("Error while saving custom feilds",error)
    }
  };


  return (
    <>
      <Modal
        className=""
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Add Custom Feild</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-3">
            Field Name:
            <input
              type="text"
              className="form-control w-75 d-inline-block mx-4"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
          </div>
          <div className="my-3">
            Field Type:
            <select
              value={fieldType}
              className="form-control w-75 d-inline-block mx-4"
              onChange={(e) => setFieldType(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
            </select>
          </div>
          {fieldType === "boolean" ? (
            <div className="my-3">
              Field Value:
              <select
                className="form-control w-75 d-inline-block mx-4"
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
              >
                <option selected value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </select>
            </div>
          ) : (
            <div className="my-3">
              Field Value:
              <input
                type={fieldType}
                value={fieldValue}
                className="form-control w-75 d-inline-block mx-4"
                onChange={(e) => setFieldValue(e.target.value)}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideHandler}>
            Close
          </Button>
          <Button variant="primary" onClick={saveData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modals;
