import { useTroubleshoot } from '../hooks/useTroubleshoot';
import ScenarioList from './troubleshoot/ScenarioList';
import QuestionCard from './troubleshoot/QuestionCard';
import SolutionCard from './troubleshoot/SolutionCard';
import '../styles/Troubleshoot.css';

function Troubleshoot() {
  const {
    step,
    scenarios,
    currentQuestion,
    currentSolution,
    history,
    loading,
    selectScenario,
    answerQuestion,
    goBack,
    restart,
  } = useTroubleshoot();

  if (loading && step === 'scenarios') {
    return (
      <div className="page">
        <div className="container">
          <p style={{ textAlign: 'center', padding: '60px 0' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Troubleshooting</h1>
        <p className="page-subtitle">Step by step diagnosis</p>

        {step === 'scenarios' && (
          <ScenarioList scenarios={scenarios} onSelect={selectScenario} />
        )}

        {step === 'questions' && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            stepNumber={history.length + 1}
            loading={loading}
            onAnswer={answerQuestion}
            onBack={goBack}
          />
        )}

        {step === 'solution' && currentSolution && (
          <SolutionCard solution={currentSolution} onRestart={restart} />
        )}
      </div>
    </div>
  );
}

export default Troubleshoot;
