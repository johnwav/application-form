import { PersonalQuestion } from "../../types/data";

const SavedQuestion = ({
  question,
  onEdit,
}: {
  question: PersonalQuestion;
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
