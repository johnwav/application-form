import {
  Input,
  Select,
  // Checkbox
} from "antd";
import { QuestionsTypeOptions } from "./Items";
import CloseIcon from "../../assets/icons/CloseIcon";
// import OrderedList from "../../assets/icons/OrderedList";
// import PlusIcon from "../../assets/icons/PlusIcon";
import "./AddQuestion.css";
import { QuestionTemplate } from "../../types/types";
import { useState } from "react";
import generateUniqueId from "../../generateId";

const AddQuestion = ({
  onSaveQuestion,
}: {
  onSaveQuestion: (question: QuestionTemplate) => void;
}) => {
  const typeOptions = QuestionsTypeOptions.map((questionType) => ({
    value: questionType,
    label: questionType,
  }));

  const { uniqueId } = generateUniqueId();

  const [question] = useState<QuestionTemplate>({
    id: uniqueId, // You should generate a unique id for the question
    type: null,
    question: "",
    choices: [],
    maxChoice: 0,
    disqualify: false,
    other: false,
  });

  return (
    <>
      <label>
        <h3>Type</h3>
        <Select
          defaultValue={null}
          style={{
            width: "100%",
            height: "68px",
            border: "1px solid black",
            borderRadius: "5px",
          }}
          onChange={null}
          options={typeOptions}
        />
      </label>
      <label>
        <h3>Question</h3>
        <Input
          style={{
            height: "68px",
            borderRadius: "5px",
            border: "1px solid #000",
            paddingInline: "24px",
          }}
          placeholder="Type here"
          value={null}
          onChange={null}
        />
      </label>

      <div className="btn-container">
        <div onClick={null} className="delete-btn">
          <CloseIcon />
          Delete Question
        </div>
        <button onClick={() => onSaveQuestion(question)} className="save-btn">
          Save
        </button>
      </div>
    </>
  );
};

export default AddQuestion;
