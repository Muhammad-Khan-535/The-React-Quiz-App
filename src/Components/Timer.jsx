import { useEffect } from 'react';
import { useQuestions } from '../Contexts/questionsContext';

const Timer = () => {
  const { dispatch, seconds } = useQuestions();
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes < 10 ? `0${minutes}` : minutes}:
      {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
    </div>
  );
};


export default Timer;
