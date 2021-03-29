import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Button, Container } from "reactstrap";

import "./Quiz.css";

const Quiz = ({ data }) => {
  const [currentScore, updateScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [currentIndex, setIndex] = useState(0);
  const [showResult, setResult] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        setResult(true);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining]);

  const handleOptionClick = (chosenOption) => {
    if (chosenOption.isCorrect) {
      console.log("Correct!");
      updateScore(currentScore + 10);
      if (currentIndex < data.length - 1) {
        setIndex(currentIndex + 1);
      } else {
        setResult(true);
      }
    } else {
      console.log("Wrong");
      if (currentIndex < data.length - 1) {
        setIndex(currentIndex + 1);
      } else {
        setResult(true);
      }
    }
  };

  return (
    <Container className="wrapper">
      {!showResult && (
        <>
          <h1>{data[currentIndex].question}</h1>
          <Row>
            {data[currentIndex].answerOptions.map((item) => {
              return (
                <Col sm="12" md="6" key={item.option}>
                  <Button
                    className="opt-btn"
                    block
                    onClick={() => handleOptionClick(item)}
                  >
                    {item.option}
                  </Button>
                </Col>
              );
            })}
          </Row>

          <p>
            {currentIndex + 1}/{data.length}
          </p>
          <h3 className="text-center">Time Remaining: {timeRemaining}</h3>
        </>
      )}
      {showResult && (
        <>
          <h1>Your score is {currentScore}</h1>
          <Link to="/topic">Go back</Link>
        </>
      )}
    </Container>
  );
};

export default Quiz;
