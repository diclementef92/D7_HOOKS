import { Component, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Chat } from "react-bootstrap-icons";

const AddComment = (props) => {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(5);
  const [email, setEmail] = useState("");

  const sendComment = async (e) => {
    e.preventDefault();

    console.log("invia commento");

    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U1MThjZGEyNDc4ZDAwMTNhMDU4NjciLCJpYXQiOjE2NzU5NTg5NjMsImV4cCI6MTY3NzE2ODU2M30.Q1jX-HShMVTgkyRHM4th05_jV0PN_rkjeroFWeC2A1M",
      },
      body: JSON.stringify({
        author: email, // non invia il valore inserito ma quello di registrazione alla API
        comment: comment,
        elementId: props.bookAsin,
        rate: rate,
      }),
    };
    try {
      console.log("props.bookAsin:", props.bookAsin);

      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        settings
      );
      if (response.ok) {
        const body = await response.json();
        console.log(body);
      } else {
        console.log(response.status, response);
      }
    } catch (e) {
      console.log("error in fetch comments", e);
    }
  };

  return (
    <Row>
      <Col>
        <Form onSubmit={(e) => sendComment(e)}>
          <Form.Group className="mb-1" controlId="form.control.mail">
            <Form.Control
              type="email"
              placeholder="La tua mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.control.comment">
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Dicci cosa ne pensi..."
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <input
              type="range"
              id="rate"
              name="rate"
              min="1"
              max="5"
              onChange={(e) => setRate(e.target.value)}
            />
            <label for="rate">Voto</label>
          </Form.Group>
          <Button type="submit">invia</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default AddComment;
