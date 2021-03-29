import axios from "axios";

const URL = "https://6016417c55dfbd00174cabaa.mockapi.io/Quizzler";

export const getData = async () => {
  const { data } = await axios.get(URL);
  return data;
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const postData = async (data, obj) => {
  let shuffledArray = shuffleArray(obj.answerOptions);
  let newQuestionObj = {
    question: obj.question,
    answerOptions: shuffledArray,
    point: 10,
  };
  data.questions.push(newQuestionObj);
  let resp = await axios.put(`${URL}/${data.id}`, {
    ...data,
  });
  console.log(resp);
};
