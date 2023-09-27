import { QuestionTemplate } from "../../types/types";

const SavedQuestion = ({
  question,
  onEdit,
}: {
  question: QuestionTemplate;
  onEdit: () => void;
}) => {
  return (
    <div>
      <span>{question.type}</span>
      <div>
        <span>{question.question}</span>
        <button onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};

export default SavedQuestion;
