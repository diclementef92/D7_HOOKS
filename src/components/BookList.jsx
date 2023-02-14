import { useState } from "react";
import { Row, Col, Form, FormControl, FormGroup } from "react-bootstrap";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";

const BookList = (props) => {
  const [textToSearch, setTextToSearch] = useState("");
  const [bookSelected, setBookSelected] = useState("0316438960");

  return (
    <>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormControl
                type="text"
                name="search"
                id="search"
                value={textToSearch} // evita warning in console
                placeholder="Cerca libro"
                onChange={(e) => setTextToSearch(e.target.value)}
              ></FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          <Row>
            {props.books
              .filter((book) =>
                book.title.toLowerCase().includes(textToSearch.toLowerCase())
              )
              .map((b) => {
                return (
                  <SingleBook
                    setBookClicked={setBookSelected}
                    book={b}
                    key={`book-${b.asin}`}
                  />
                );
              })}
          </Row>
        </Col>
        <Col>
          <CommentArea bookAsin={bookSelected}></CommentArea>
        </Col>
      </Row>
    </>
  );
};

export default BookList;
