import { useState } from "react";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";

import { postData } from "../networkHandler";

const Topic = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState("");
  const [wrongOption1, setWrongOption1] = useState("");
  const [wrongOption2, setWrongOption2] = useState("");
  const [wrongOption3, setWrongOption3] = useState("");
  const toggleModal = () => setModal(!modal);

  const handleSubmit = () => {
    if (
      question.length === 0 ||
      correct.length === 0 ||
      wrongOption1.length === 0 ||
      wrongOption2.length === 0 ||
      wrongOption3.length === 0
    ) {
      alert("Enter valid values");
    } else {
      let obj = {
        question,
        answerOptions: [
          { option: correct, isCorrect: true },
          { option: wrongOption1, isCorrect: false },
          { option: wrongOption2, isCorrect: false },
          { option: wrongOption3, isCorrect: false },
        ],
      };
      postData(data, obj);
    }
  };
  return (
    <Container>
      <div className="mt-lg">
        {Object.keys(data).length > 0 && (
          <>
            <h1 className="text-center">
              <Link to="/">
                <i className="fas fa-long-arrow-alt-left"></i>
              </Link>
              {data.title}
            </h1>
            <p className="text-center lead">{data.description}</p>
            <Link className="a-tag" to="/quiz">
              <Button className="mr-2">Go to Quiz</Button>
            </Link>
            <Button onClick={toggleModal}>Add Question</Button>
            <Modal isOpen={modal}>
              <ModalHeader toggle={toggleModal}>Add a question</ModalHeader>
              <ModalBody>
                <Input
                  className="input"
                  type="text"
                  placeholder="Enter question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <Input
                  className="input"
                  type="text"
                  placeholder="Enter correct answer"
                  value={correct}
                  onChange={(e) => setCorrect(e.target.value)}
                />
                <Input
                  className="input"
                  type="text"
                  placeholder="Enter wrong answer"
                  value={wrongOption1}
                  onChange={(e) => setWrongOption1(e.target.value)}
                />
                <Input
                  className="input"
                  type="text"
                  placeholder="Enter wrong answer"
                  value={wrongOption2}
                  onChange={(e) => setWrongOption2(e.target.value)}
                />
                <Input
                  className="input"
                  type="text"
                  placeholder="Enter wrong answer"
                  value={wrongOption3}
                  onChange={(e) => setWrongOption3(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleSubmit}>Submit</Button>
              </ModalFooter>
            </Modal>
          </>
        )}
        {Object.keys(data).length === 0 && (
          <>
            <h1 className="text-center">404 Page not found</h1>
            <p className="text-center lead">
              Go to <Link to="/">homepage</Link> and try again
            </p>
          </>
        )}
      </div>
    </Container>
  );
};

export default Topic;
