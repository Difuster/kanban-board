import React, { FC, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import EditColumnModal from "./EditColumnModal";

interface DropdownMenuProps {
  columnId: number;
};

const DropdownMenu: FC<DropdownMenuProps> = ({ columnId }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle size="sm" variant="secondary" >
          edit
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleShow}>Edit Title</Dropdown.Item>
          <Dropdown.Item onClick={() => alert("Sorry")}>Delete List</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <EditColumnModal
        show={show}
        setShow={setShow}
        columnId={columnId}
      />
    </>
  );
};

export default DropdownMenu;
