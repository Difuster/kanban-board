import React, { FC, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import EditCardModal from "./EditCardModal";
import edit from "../../assets/images/edit.png";
import comment from "../../assets/images/comment.png";
import { Context } from "../../reducer/reducer";
import { IComment } from "../../types/types";

interface CardItemProps {
  columnId: number;
  comments: IComment[];
};

const CardItem: FC<CardItemProps> = ({ columnId, comments }) => {
  const { state } = useContext(Context);

  const currentCards = state.cards.filter((card) => card.columnId === columnId);

  const [clickedCardId, setClickedCardId] = useState(0);
  const [modalIsShown, setModalIsShown] = useState(false);

  const handleOpenCardModal = (id: number) => {
    setModalIsShown(true);
    setClickedCardId(id);
  };

  return (
    <>
      {
        modalIsShown ? 
          <EditCardModal
            columnId={columnId}
            cardId={clickedCardId}
            modalIsShown={modalIsShown}
            setModalIsShown={setModalIsShown}/> :
          null
      }

      {
        currentCards.map((card) => {
          return (
            <ListGroup.Item key={card.id}
              className="p-0 border-0 mb-2"
              onClick={() => handleOpenCardModal(card.id)}
            >
              <Card>
                <Card.Body>
                  <Card.Title
                    style={{overflowWrap: "break-word"}}
                    className="disp-fl-row card__title"
                  >
                    <Card.Text
                      style={{width: "85%"}}
                    >
                      {card.title}
                    </Card.Text>
                    <img src={edit}
                      alt="edit card"
                      style={{height: "16px"}}
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
