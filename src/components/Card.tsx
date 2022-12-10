import React, {FC, useState} from "react";
import Card from "react-bootstrap/Card";
import edit from "../assets/images/edit.png";

interface CardItemProps {
  columnId: number;
  id: number;
  text: string;
}

const CardItem: FC<CardItemProps> = ({columnId, id, text}) => {
  return (
    <Card style={{marginBottom: "5px"}}>
      <Card.Body style={{padding: "10px"}}>
        <Card.Title className="disp-fl-row card__title">
          {text}
          <img src={edit}
            alt="edit card"
            style={{height: "16px"}}
          />
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
