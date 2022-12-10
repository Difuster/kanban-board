import React, {FC, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Column from "./column/Column";
import Header from "./Header";
import "./style.css";

interface BoardProps {
  name: string;
};

interface column {
  id: number;
  name: string;
};

const state = {
  columns: [
    { id: 1, name: "TODO" },
    { id: 2, name: "In Progress" },
    { id: 3, name: "Testing" },
    { id: 4, name: "Done" },
  ]
};

const Board: FC<BoardProps> = ({name}) => {
  const [columns, setColumns] = useState<column[]>(state.columns)
  return (
    <div className="board">
      <Header />
      <hr />
      <Container fluid>
        <Row>
          {
            columns.map((col) => {
              return (
                <Column
                  key={col.id}
                  id={col.id}
                  name={col.name}
                  columns={columns}
                  setColumns={setColumns}
                />
              )
            })
          }
        </Row>
      </Container>
    </div>
  )
}

export default Board;
