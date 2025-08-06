import { useQuestions } from '../Contexts/questionsContext';

const NextButton = () => {
  const { dispatch, answer, index, numQuestions } = useQuestions();

  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: 'nextQuestion' })}
        className="btn btn-ui"
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: 'finished' })}
        className="btn btn-ui"
      >
        Finish
      </button>
    );
};

export default NextButton;
