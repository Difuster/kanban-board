import React, { FC, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Column from "./column/Column";
import Header from "./Header";
import "./style.css";
import { Context } from "../reducer/reducer";
import { IColumn, ICard, IComment } from "../types/types";

const Board: FC = () => {
  const { state, dispatch } = useContext(Context);
  const columns = state.columns;
  const cards = state.cards;
  const comments = state.comments;

  interface renderColumnProps {
    columns: IColumn[];
    cards: ICard[];
    comments: IComment[];
    dispatch: any;
  };

  const renderColumns = (value: renderColumnProps) => {
    return (
      columns.map((col) => {
        return (
          <Col
            key={col.id}
            className="m-1 p-2 text-dark"
          >
            <Column
              columnId={col.id}
              columnTitle={col.title}
              comments={value.comments}
              dispatch={value.dispatch}
            />
          </Col>
        )
      })
    )
  };

  return (
    <Container className="board" fluid>
      <Row>
        <Header />
        <hr />
      </Row>
      <Row>
        {renderColumns({ columns, cards, comments, dispatch })}
      </Row>
    </Container>
  )
}

export default Board;
