import React, { FC, useState, useContext, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "../../reducer/reducer";
import { saveDescription, updateComments, deleteCard } from "../../reducer/reducer";
import dustbin from "../../assets/images/dustbin.png";
import { IComment } from "../../types/types";

interface EditCommentModalProps {
  show: boolean;
  setShow: any,
  comment: IComment,
  comments: IComment[]
  setComments: any;
}

const EditCommentModal: FC<EditCommentModalProps> = ({
  show, setShow, comment, comments, setComments,
}) => {
  const [inputValue, setInputValue] = useState(comment.text);

  const handleSaveComment = (e: any) => {
    e.preventDefault();
    const newComments = comments.map((com) => {
      if (com.id === comment.id) {
        com.text = inputValue;
      }
      return com;
    });
    setComments(newComments);
    setShow(false);
  };

  return (
    <Modal show={show}>
      <Container className="border border-2 border-primary rounded bg-primary text-white">
        <Modal.Header closeButton>
          Edit Comment
        </Modal.Header>
        <Form.Control
          onChange={(e) => setInputValue(e.target.value)}
          name="description"
          type="text"
          value={inputValue}
          autoComplete="off"
          className="me-2 rounded bg-primary text-white"
        />
        <Button
          type="submit"
          variant="success"
          onClick={handleSaveComment}
        >
          Save
        </Button>
      </Container>
    </Modal>
  )
};

export default EditCommentModal;

