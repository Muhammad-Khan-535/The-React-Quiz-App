import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useReducer } from "react";

const questionsContext = createContext();

const initialState = {
  questions: [],

  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  seconds: null,
};

const SECONDS_PER_QUESTION = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFiled":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        seconds: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore: Math.max(state.highscore, state.points),
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 0 ? "finished" : state.status,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function QuestionsProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, seconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    import("../../data/questions.json")
      .then((module) =>
        dispatch({ type: "dataReceived", payload: module.default.questions })
      )
      .catch((error) => dispatch({ type: "dataFiled", payload: error }));
  }, []);

  return (
    <questionsContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        seconds,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </questionsContext.Provider>
  );
}

QuestionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useQuestions() {
  const context = useContext(questionsContext);
  if (context === undefined) {
    throw new Error("useQuestions must be used within a questionsProvider");
  }
  return context;
}

export { QuestionsProvider, useQuestions };
