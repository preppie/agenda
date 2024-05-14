import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";


const Activitate = (props) => {
  const { ora, titlu, loc, descriere, imageName, sterge, editeaza, id } = props;

  const stil = {
    svg: {
      PointerEvents: "none"
    }
  };

  return (
    <Container>
      <Col xs={2} md={1}>
        <Image src={window.location.origin + `/images/${imageName}`} rounded width="100px" alt="proba" />
      </Col>
      <h4>{ora} - {titlu}</h4>
      <Row>
        <Col xs={9}>
          <h6>Loc: {loc}</h6>
        </Col>
        <Col xs={3} className="d-flex align-items-center justify-content-end">
          <Button variant="link" onClick={() => editeaza(id)} id={id} style={stil}>
            <BsPencilSquare />
          </Button>
          <Button variant="link" onClick={() => sterge(id)} id={id} style={stil}>
            <BsTrashFill />
          </Button>
        </Col>
      </Row>
      <p>{descriere}</p>
      <hr />
    </Container>
  );
};

export default Activitate;
