import { useState } from "react";
import AddQuestion from "../AddQuestion/AddQuestion";
import "./Question.css";

const Question = ({ question, onEditQuestion, onDeleteQuestion }) => {
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = () => {
    setEditOpen(true);
  };
  const handleDelete = () => {
    // Call the onDeleteQuestion callback to delete the question
    onDeleteQuestion(question);
  };

  return (
    <>
      {editOpen ? (
        <AddQuestion
          onSaveQuestion={(question) => {
            // Handle saving the edited question
            // You can pass the editedQuestion to the parent component
            onEditQuestion(question);
            setEditOpen(false); // Close the edit mode
          }}
          onDeleteQuestion={handleDelete} // You can implement deletion if needed
          editedQuestion={question}
        />
      ) : (
        <div className="edit-question">
          <div className="tcontain" style={{ fontSize: "1.17em" }}>
            <small className="type">{question.type} type</small>
            <h3
              style={{
                marginBlock: 5,
                maxWidth: "535px",
                textOverflow: "ellipsis",
              }}
            >
              {question.id} titlesssss
            </h3>
          </div>
          <div></div>
          <img onClick={handleEdit} src="/images/edit.png" />
        </div>
      )}
    </>
  );
};

export default Question;
