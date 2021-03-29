import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { getData } from "./networkHandler";

import Home from "./pages/Home";
import Topic from "./pages/Topic";
import Quiz from "./pages/Quiz";

import "./styles.css";

const App = () => {
  const [data, setData] = useState([]);
  const [currentTopic, setCurrentTopic] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let res = await getData();
      setData(res);
    };
    fetchData();
  }, []);

  const handleTopicSelect = (topic) => {
    setCurrentTopic(topic);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Home data={data} handleTopicSelect={handleTopicSelect} />
            )}
          />
          <Route
            exact
            path="/topic"
            component={() => <Topic data={currentTopic} />}
          />
          <Route
            exact
            path="/quiz"
            component={() => <Quiz data={currentTopic.questions} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default App;
