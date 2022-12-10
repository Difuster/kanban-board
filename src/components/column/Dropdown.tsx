import React, {FC, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import EditTitleModal from "./EditTitleModal";

interface column {
  id: number;
  name: string;
};

interface DropdownMenuProps {
  columnId: number;
  columns: column[];
  setColumns: (arg: column[]) => void;
};

const DropdownMenu: FC<DropdownMenuProps> = ({columnId, columns, setColumns}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  }
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
      <EditTitleModal
        show={show}
        setShow={setShow}
        columnId={columnId}
        columns={columns}
        setColumns={setColumns}
      />
    </>
  );
};

export default DropdownMenu;
