import React, { FC, useState, useContext, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "../../reducer/reducer";
import { saveDescription, updateComments } from "../../reducer/reducer";

interface EditTitleModalProps {
  columnId: number;
  cardId: number;
  modalIsShown: boolean;
  setModalIsShown: any;
};

const EditCardModal: FC<EditTitleModalProps> = ({
  columnId, cardId, modalIsShown, setModalIsShown
}) => {
  const { state, dispatch } = useContext(Context);
  const currentColumn = state.columns.filter(column => column.id === columnId)[0];
  const card = state.cards.filter(card => card.id === cardId)[0];
  const allComments = state.comments;
  const currentCardComments = allComments.filter((comment) => comment.cardId === card.id);
  const userName = localStorage.getItem("name") || "user";

  // local states
  const [comments, setComments] = useState(allComments);
  const [currentCardCommentsToShow, setCurrentCardCommentsToShow] = useState(currentCardComments);
  console.log("currentCardComments", currentCardComments);
  console.log("comments", comments);
  // input values
  const [descriptionValue, setDescriptionValue] = useState(card.description);
  const [commentsValue, setCommentsValue] = useState("Write a comment...");

  const commentInput = useRef<HTMLInputElement>(null!);

  // handlers  
  const handleCloseClick = () => {
    setModalIsShown(false);
    dispatch(saveDescription(card.id, descriptionValue));
    dispatch(updateComments(comments));
    setComments([]);
  };

  const handleSaveDescription = (e: any) => {
    e.preventDefault();
    setDescriptionValue(descriptionValue);
  };

  const handleDeleteDescription = (e: any) => {
    e.preventDefault();
    setDescriptionValue("");
  };

  const handleChangeDescriptionValue = (e: any) => {
    setDescriptionValue(e.target.value);
  };

  const handleSaveComment = (e: any) => {
    e.preventDefault();
    const newComment = {
      cardId: card.id,
      id: Math.random(),
      text: commentsValue,
      userName: userName,
    };
    const newComments = [...comments, newComment];
    const newCurrentCardCommentsToShow = [...currentCardCommentsToShow, newComment];
    setCommentsValue("Write a comment...");
    setComments(newComments);
    setCurrentCardCommentsToShow(newCurrentCardCommentsToShow);
  };

  const handleChangeCommentsValue = (e: any) => {
    setCommentsValue(e.target.value);
  };

  const handleClickOnIput = () => {
    commentInput.current?.select();
  };
   
  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.code === "Escape") handleCloseClick();
    });
  })

  return (
    <Modal show={modalIsShown}>
      <Modal.Header closeButton onHide={handleCloseClick}>
        <Container>
          <Row className="fw-bold">{card.title}</Row>
          <Row className="mb-6">in list {currentColumn.title}</Row>
        </Container>
      </Modal.Header>
      <Modal.Body>
        <Container>
        <Form>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            style={{minHeight: "100px"}}
            name="description"
            value={descriptionValue}
            type="text"
            autoComplete="off"
            className="me-2"
            onChange={handleChangeDescriptionValue}
          />
          <Button
            type="submit"
            variant="success"
            onClick={handleSaveDescription}
          >
            Save
          </Button>
          {" "}
          <Button
            type="submit"
            variant="danger"
            onClick={handleDeleteDescription}
          >
            Delete
          </Button>
        </Form.Group>
      </Form>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Comments</Form.Label>
          <ListGroup>
            {currentCardCommentsToShow.map((comment) => {
              return (
                <ListGroup.Item key={comment.id}>
                  {comment.text}
                </ListGroup.Item>
              )
            })}
          </ListGroup>
          <Form.Control
            onSubmit={handleSaveComment}
            style={{minHeight: "50px"}}
            name="comments"
            value={commentsValue}
            type="text"
            autoComplete="off"
            className="me-2"
            ref={commentInput}
            onChange={handleChangeCommentsValue}
            onClick={handleClickOnIput}
          />
          <Button type="submit" variant="success" onClick={handleSaveComment}>
            Add Comment
          </Button>
        </Form.Group>
      </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditCardModal;
