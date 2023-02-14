import { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Chat } from "react-bootstrap-icons";

class AddComment extends Component {
  state = {
    author: "",
    comment: "",
    // rate: 0,
  };

  async sendComment(e) {
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
      body: JSON.stringify(this.state),
    };
    try {
      console.log("props.bookAsin:", this.props.bookAsin);

      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.bookAsin,
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
  }

  updateEmail = (e) => {
    this.setState({ author: e.target.value });
  };
  updateComment = (e) => {
    this.setState({ comment: e.target.value });
  };

  render() {
    return (
      <Row>
        <Col>
          <Form onSubmit={(e) => this.sendComment(e)}>
            <Form.Group className="mb-1" controlId="form.control.mail">
              <Form.Control
                type="email"
                placeholder="La tua mail"
                onChange={(e) => this.updateEmail(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.control.comment">
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="Dicci cosa ne pensi..."
                onChange={(e) => this.updateComment(e)}
              />
            </Form.Group>
            <Button type="submit">invia</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default AddComment;
// <Form onSubmit={this.addComment}>
//   <Form.Group>
//     <Form.Control type="text" placeholder="la tua email" name="email" />
//     <Form.Control
//       type="text"
//       placeholder="il tuo commento"
//       name="comment"
//     />
//     <Button>invia</Button>
//   </Form.Group>

//   {/* <Chat onClick={() => this.addComment()} className="bi bi-chat"></Chat> */}
// </Form>
