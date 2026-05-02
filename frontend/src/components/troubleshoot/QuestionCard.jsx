import { useState } from 'react';

// i used strategy pattern: each question type is a self contained renderer.
// adding a new type means writing a new component here, not modifying existing ones (OCP).

function YesNoQuestion({ question, onAnswer, loading }) {
  return (
    <div className="answer-buttons">
      <button
        className="answer-btn"
        onClick={() => onAnswer(question.yes)}
        disabled={loading}
      >
        Yes
      </button>
      <button
        className="answer-btn"
        onClick={() => onAnswer(question.no)}
        disabled={loading}
      >
        No
      </button>
    </div>
  );
}

function ChoiceQuestion({ question, onAnswer, loading }) {
  return (
    <div className="answer-buttons">
      {question.options.map((option, i) => (
        <button
          key={i}
          className="answer-btn"
          onClick={() => onAnswer(option.next)}
          disabled={loading}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}

function InputQuestion({ question, onAnswer, loading }) {
  const [value, setValue] = useState('');
  return (
    <div className="input-answer">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter your answer..."
        className="answer-input"
      />
      <button
        className="answer-btn"
        onClick={() => onAnswer(question.next)}
        disabled={loading || !value}
      >
        Next
      </button>
    </div>
  );
}

const QUESTION_RENDERERS = {
  'yes-no': YesNoQuestion,
  'choice': ChoiceQuestion,
  'input': InputQuestion,
};

function QuestionCard({ question, stepNumber, loading, onAnswer, onBack }) {
  const Renderer = QUESTION_RENDERERS[question.type];
  return (
    <div className="question-container">
      <div className="progress-bar">
        <span>Step {stepNumber}</span>
        <button onClick={onBack} className="back-btn">← Back</button>
      </div>
      <div className="question-card">
        <h2>{question.text}</h2>
        {Renderer
          ? <Renderer question={question} onAnswer={onAnswer} loading={loading} />
          : <p>Unsupported question type: {question.type}</p>
        }
      </div>
    </div>
  );
}

export default QuestionCard;
