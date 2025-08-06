import { useQuestions } from '../Contexts/questionsContext';

const Progress = () => {
  const { numQuestions, index, points, maxPoints, answer } = useQuestions();

  return (
    <header className="progress">
      <progress
        value={index + Number(answer !== null)}
        max={numQuestions}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
};

export default Progress;
