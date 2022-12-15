import React, { FC, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import { Context } from "../../reducer/reducer";
import { IComment } from "../../types/types";
import ListGroup from "react-bootstrap/ListGroup";
import DropdownMenu from "./Dropdown";
import comment from "../../assets/images/comment.png";

interface CardItemProps {
  columnId: number;
  comments: IComment[];
};

const CardItem: FC<CardItemProps> = ({ columnId, comments }) => {
  const { state } = useContext(Context);

  const currentCards = state.cards.filter((card) => card.columnId === columnId);

  // const [clickedCardId, setClickedCardId] = useState(0);
  // const [modalIsShown, setModalIsShown] = useState(false);

  return (
    <>
      {
        currentCards.map((card) => {
          return (
            <ListGroup.Item key={card.id}
              className="p-0 border-0 mb-2"
            >
              <Card>
                <Card.Body>
                  <Card.Title
                    className="card-title border-bottom border-dark"
                  >
                    <Card.Text
                      className="align-items-center"
                      style={{width: "85%"}}
                    >
                      {card.title}
                    </Card.Text>
                    <DropdownMenu
                      columnId={columnId}
                      cardId={card.id}
                    />
                  </Card.Title>
                  <Card.Text>
                    <img
                      src={comment}
                      alt="comments"
                    />
                    {" "}
                    {comments.filter((comment) => comment.cardId === card.id).length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          )
        })
      }
    </>
  );
};

export default CardItem;
