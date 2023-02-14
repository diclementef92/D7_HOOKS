import { Component, useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";

const CommentArea = (props) => {
  // state = {
  //   isLoading: true,
  //   comments: [],
  // };

  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const retriveComments = async () => {
    try {
      let res = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + props.bookAsin,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U1MThjZGEyNDc4ZDAwMTNhMDU4NjciLCJpYXQiOjE2NzU5NTg5NjMsImV4cCI6MTY3NzE2ODU2M30.Q1jX-HShMVTgkyRHM4th05_jV0PN_rkjeroFWeC2A1M",
          },
        }
      );
      if (res.ok) {
        let body = await res.json();
        console.log(body);
        // this.setState({ comments: body, isLoading: false });
        setIsLoading(false);
        setComments(body);
      } else {
        console.log(res.status, res);
      }
    } catch (e) {
      console.log("Error in fetch:", e);
      setIsLoading(false);
    }
  };

  // const componentDidUpdate = (prevProps) => {
  //   console.log("update!:", prevProps);
  //   if (prevProps.bookAsin !== this.props.bookAsin) {
  //     retriveComments();
  //   }
  // };

  useEffect(() => {
    retriveComments();
  }, [props.bookAsin]);

  return (
    <>
      <Card.Header className="p-0">
        <h1>👈Seleziona un libro</h1>
        COMMENTI
      </Card.Header>
      <Card>
        {isLoading && (
          <div className="ml-2">
            <Spinner animation="border" variant="success" />
          </div>
        )}
        {!isLoading && comments.length > 0 ? (
          <CommentsList comments={comments} />
        ) : (
          <p>Ancora nessun commento</p>
        )}
        <AddComment bookAsin={props.bookAsin} />
      </Card>
    </>
  );
};

export default CommentArea;
