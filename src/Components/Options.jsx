import { useQuestions } from '../Contexts/questionsContext';

const Options = () => {
  const { questions, index, dispatch, answer } = useQuestions();
  const hasAnswer = answer !== null;
  const question = questions[index];

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswer
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={index}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
