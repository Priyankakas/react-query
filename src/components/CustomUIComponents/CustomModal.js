import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export const CustomModal = (props) => {
  const [show, setShow] = useState(props?.show);

  useEffect(() => {
    setShow(props?.show);
  }, [props.show]);

  return (
    <div>
      <Modal show={show} onHide={props?.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props?.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props?.handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
