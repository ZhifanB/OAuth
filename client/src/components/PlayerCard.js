import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";

const PlayerCard = (props) => {
  //   console.log(props.playerInfo);
  //   console.log(props.playerStat);

  return (
    <Card bg="light" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={
          process.env.PUBLIC_URL +
          `/photos/action_photos/${props.playerInfo.PLAYER_ID}.png`
        }
      />
      <Card.Body>
        <Card.Title>{props.playerInfo.NAME}</Card.Title>
        <ul>
          <li>PTS: {Number(props.playerStat.Points).toFixed(2)}</li>
          <li>Reb: {Number(props.playerStat.Rebounds).toFixed(2)} </li>
          <li>Ass: {Number(props.playerStat.Assist).toFixed(2)}</li>
        </ul>

        <Button
          variant="primary"
          //what is the difference between onClick={props.deleteCard(props.ind)} and below??? why the former doesn't work
          onClick={() => {
            props.deleteCard(props.ind);
          }}
        >
          Delete Card
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PlayerCard;

// </Card.Body>
//  {/* <ListGroup className="list-group-flush">
//  <ListGroupItem>Points: {}</ListGroupItem>
// <ListGroupItem>Rebounds: {}</ListGroupItem>
// <ListGroupItem>Assist: {}</ListGroupItem>
// </ListGroup>
//       <Card.Body>
//         <Card.Link href="#">Delete Card</Card.Link>
