import React, { FC, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import EditCardModal from "./EditCardModal";
import EditTitleModal from "./EditTitleModal";
import edit from "../../assets/images/edit.png";
// import EditColumnModal from "./EditColumnModal";

interface DropdownMenuProps {
  columnId: number,
  cardId: number;
};

const DropdownMenu: FC<DropdownMenuProps> = ({columnId, cardId}) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditTitleModal, setShowEditTitleModal] = useState(false);

  return (
    <>
    {
      showInfoModal ? 
        <EditCardModal
          columnId={columnId}
          cardId={cardId}
          show={showInfoModal}
          setShow={setShowInfoModal}
        /> :
        null
    }
    {
      showEditTitleModal ? 
        <EditTitleModal
          cardId={cardId}
          show={showEditTitleModal}
          setShow={setShowEditTitleModal}
        /> :
        null
    }
      <Dropdown>
        <Dropdown.Toggle size="sm" variant="secondary" >
          <span>...</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setShowEditTitleModal(true)}>Edit Title</Dropdown.Item>
          <Dropdown.Item onClick={() => setShowInfoModal(true)}>Info</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* <EditColumnModal
        show={show}
        setShow={setShow}
        columnId={columnId}
      /> */}
    </>
  );
};

export default DropdownMenu;
