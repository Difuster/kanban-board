import React, { FC, useState, useContext, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "../../reducer/reducer";
import { saveDescription, updateComments, deleteCard } from "../../reducer/reducer";
import dustbin from "../../assets/images/dustbin.png";
import cardIcon from "../../assets/images/card.png";
import EditCommentModal from "./EditCommentModal";
import { IComment } from "../../types/types";

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
  const [currentCardCommentsToRender, setCurrentCardCommentsToRender] = useState(currentCardComments);
  const [commentModalIsShown, setCommentModalIsShown] = useState(false);
  const [clickedComment, setClickedComment] = useState({
    cardId: NaN,
    id: NaN,
    text: "",
    userName: "",
  });

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

  const handleSaveDescription = (e: any): void => {
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
    const newCurrentCardCommentsToRender = [...currentCardCommentsToRender, newComment];
    setCommentsValue("Write a comment...");
    setComments(newComments);
    setCurrentCardCommentsToRender(newCurrentCardCommentsToRender);
  };

  const handleClickOnIput = () => {
    commentInput.current?.select();
  };

  const handleOpenEditCommentModal = (com: IComment) => {
    setCommentModalIsShown(true);
    setClickedComment(com);
  };

  const handleDeleteComment = (e: any, colId: number) => {
    e.preventDefault();
    const newComments = comments.filter(comment => comment.id !== colId);
    const newCurrentCardCommentsToRender = currentCardCommentsToRender.filter(comment => comment.id !== colId);
    setComments(newComments);
    setCurrentCardCommentsToRender(newCurrentCardCommentsToRender);
  };

  return (
    <Modal show={modalIsShown} onEscapeKeyDown={handleCloseClick}>
      <Modal.Header closeButton onHide={handleCloseClick}>
        <Container>
          <Row className="fw-bold">
            <img src={cardIcon} alt="card" style={{width: "50px", height: "24px"}}/>
            {card.title}
          </Row>
          <Row className="mb-6">
            <span className="ms-6">
              in list {currentColumn.title}
            </span>
          </Row>
          <Row className="mb-6">
            <span className="ms-6">
              created by {userName}
            </span>
          </Row>
        </Container>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {
          commentModalIsShown ?
            <EditCommentModal
              show={commentModalIsShown}
              setShow={setCommentModalIsShown}
              comment={clickedComment}
              comments={comments}
              setComments={setComments}
            /> :
            null
          }
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                className="me-2 mb-3"
                style={{minHeight: "105px"}}
                name="description"
                value={descriptionValue}
                type="text"
                autoComplete="off"
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
              <ListGroup className="rounded-0">
                {currentCardCommentsToRender.map((comment) => {
                  return (
                    <ListGroup.Item
                      key={comment.id}
                      className="mb-2 border border-dark"
                      style={{cursor: "pointer"}}
                    >
                      <Container>
                        <Row
                          className="mb-2"
                          onClick={() => handleOpenEditCommentModal(comment)}
                        >
                          <span>
                            {comment.text}
                          </span>
                        </Row>
                        <Row>
                          <Col>
                            <span className="text-end"><em>commented by {userName}</em></span>
                          </Col>
                          <Col style={{textAlign: "right"}}>
                            <Button
                              variant="danger"
                              onClick={(e) => handleDeleteComment(e, comment.id)}
                              className="p-0"
                              style={{height: "28px", width: "28px"}}
                            >
                              <img src={dustbin}
                                alt="delete comment"
                                style={{paddingBottom: "3px"}}
                              />
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
              <Form.Control
                onSubmit={handleSaveComment}
                className="me-2 mb-2"
                style={{minHeight: "50px"}}
                name="comments"
                value={commentsValue}
                type="text"
                autoComplete="off"
                ref={commentInput}
                onChange={(e) => setCommentsValue(e.target.value)}
                onClick={handleClickOnIput}
              />
              <Button
                type="submit"
                variant="success"
                onClick={handleSaveComment}
              >
                Add Comment
              </Button>
            </Form.Group>
          </Form>
        </Container>
        <Container>
          <Button
          className="d-sm-flex flex-row justify-content-between align-items-center"
            type="submit"
            variant="danger"
            onClick={() => dispatch(deleteCard(cardId))}
          >
            <img src={dustbin} alt="delete card" />
            <span className="ms-2">Delete Card</span>
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditCardModal;
