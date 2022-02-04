import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((datas) => {
        setQuestions(datas)
        console.log(questions);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => {
        const deletedOne = questions.filter((e) => (e.id !== id));
        setQuestions(deletedOne)
      });
  }

  
  const questionItem = questions.map((e) => (
    <QuestionItem
      key={e.id}
      question={e}
      handleDelete={handleDelete}
    />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionItem}
      </ul>
    </section>
  );
}

export default QuestionList;
