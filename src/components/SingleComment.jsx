import { Component } from "react";
import { ListGroup } from "react-bootstrap";

class SingleComment extends Component {
  state = {};

  render() {
    return (
      <ListGroup.Item>
        <span className="commentAuthor">
          {this.props.comment.author} ha scritto:
        </span>
        <p className="commentText"> {this.props.comment.comment}</p>
        <span>Voto: {this.props.comment.rate}</span>
      </ListGroup.Item>
    );
  }
}

export default SingleComment;
