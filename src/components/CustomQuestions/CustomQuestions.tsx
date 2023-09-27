import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Question from "../Question/Question";
import { useEffect, useState } from "react";
import PlusIcon from "../../assets/icons/PlusIcon";
import AddQuestion from "../AddQuestion/AddQuestion";
import { QuestionTemplate } from "../../types/types";
import { setCustomisedQuestion } from "../../data/dataSlice";

const CustomQuestions = () => {
  const customisedQuestions = useSelector(
    (state: RootState) => state.data.data.attributes.customisedQuestions
  );
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState(customisedQuestions || []);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState<QuestionTemplate | null>(
    null
  );

  const handleSaveQuestion = (newQuestion: QuestionTemplate) => {
    setQuestions((prev) => [...prev, newQuestion]);
    setEditedQuestion(newQuestion);
    setShowAddQuestion(false);
  };

  const handleDeleteQuestion = (questionToDelete: QuestionTemplate) => {
    setShowAddQuestion(false); // Close the AddQuestion component

    if (questions.length > 0) {
      // Check if the question being deleted is the edited question
      if (editedQuestion && editedQuestion.id === questionToDelete.id) {
        setEditedQuestion(null); // Clear the edited question state
      }
      // Remove the question from the profileQuestions array

      setQuestions((prev) => ({
        ...prev,
        profileQuestions: prev.filter((q) => q.id !== questionToDelete.id),
      }));
    }

    questionToDelete && console.log(questionToDelete, "deleted");
  };

  const handleUpdateQuestion = (updatedQuestion: QuestionTemplate) => {
    const newQuestions = [...questions];
    const questionIndex = newQuestions.findIndex(
      (q) => q.id === updatedQuestion.id
    );

    if (questionIndex !== -1) {
      const updatedCustomisedQuestions = newQuestions;
      updatedCustomisedQuestions[questionIndex] = updatedQuestion;

      setQuestions(updatedCustomisedQuestions);
    }
  };

  useEffect(() => {
    dispatch(setCustomisedQuestion(questions));
    console.log("dispatching", questions);
  }, [questions]);
  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {questions.length > 0 &&
        questions.map((question, index) => (
          <div
            key={index}
            style={{
              borderBottom:
                index === questions.length - 1
                  ? "none"
                  : "1px solid var(--grey)",
              paddingBottom: "20px",
            }}
          >
            <Question
              onEditQuestion={(newQuestion) =>
                handleUpdateQuestion(newQuestion)
              }
              question={question}
              key={question.id}
              onDeleteQuestion={handleDeleteQuestion}
            />
          </div>
        ))}

      {showAddQuestion && (
        <AddQuestion
          onSaveQuestion={handleSaveQuestion}
          editedQuestion={editedQuestion}
          onDeleteQuestion={handleDeleteQuestion}
        />
      )}

      <label
        style={{
          marginTop: "50px",
          cursor: "pointer",
        }}
      >
        <div
          onClick={() => {
            setEditedQuestion(null); // Clear any edited question
            setShowAddQuestion(true);
          }}
          style={{ display: "flex", gap: "20px" }}
          className="add"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <PlusIcon />
            <strong>Add a Question</strong>
          </div>
        </div>
      </label>
    </div>
  );
};

export default CustomQuestions;
