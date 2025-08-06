import Options from './Options';
import { useQuestions } from '../Contexts/questionsContext';

const Questions = () => {
  const { questions, index } = useQuestions();

  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options />
    </div>
  );
};

export default Questions;
