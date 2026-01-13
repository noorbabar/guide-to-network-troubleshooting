import { useState, useEffect } from 'react';
import { fetchScenarios, fetchScenario, fetchQuestion, fetchSolution } from '../utils/api';
import '../styles/Troubleshoot.css';

function Troubleshoot() {
  const [step, setStep] = useState('scenarios');
  const [scenarios, setScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentSolution, setCurrentSolution] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    setLoading(true);
    try {
      const response = await fetchScenarios();
      if (response.status === 'success') {
        setScenarios(response.data);
      }
    } catch (error) {
      console.error('Failed to load scenarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectScenario = async (scenarioId) => {
    setLoading(true);
    try {
      const response = await fetchScenario(scenarioId);
      if (response.status === 'success') {
        setCurrentScenario(response.data.scenario);
        setCurrentQuestion(response.data.firstQuestion);
        setStep('questions');
        setHistory([]);
      }
    } catch (error) {
      console.error('Failed to load scenario:', error);
    } finally {
      setLoading(false);
    }
  };

  const answerQuestion = async (nextId) => {
    setLoading(true);
    
    setHistory([...history, currentQuestion]);

    if (nextId.startsWith('sol_')) { 
        try {
        const response = await fetchSolution(nextId);
        if (response.status === 'success') {
            setCurrentSolution(response.data);
            setStep('solution');
        }
        } catch (error) {
        console.error('Failed to load solution:', error);
        }
    } else {
        try {
        const response = await fetchQuestion(nextId);
        if (response.status === 'success') {
            setCurrentQuestion(response.data);
        }
        } catch (error) {
        console.error('Failed to load question:', error);
        }
    }
    
    setLoading(false);
    setInputValue('');
  };

  const goBack = () => {
    if (history.length > 0) {
      const previousQuestion = history[history.length - 1];
      setCurrentQuestion(previousQuestion);
      setHistory(history.slice(0, -1));
    } else {
      restart();
    }
  };

  const restart = () => {
    setStep('scenarios');
    setCurrentScenario(null);
    setCurrentQuestion(null);
    setCurrentSolution(null);
    setHistory([]);
    setInputValue('');
  };

  const copyCommand = (command) => {
    navigator.clipboard.writeText(command);
  };

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
        <p className="page-subtitle">Step by step network diagnosis</p>

        {step === 'scenarios' && (
          <div className="scenarios-grid">
            {scenarios.map(scenario => (
              <div 
                key={scenario.id} 
                className="scenario-card"
                onClick={() => selectScenario(scenario.id)}
              >
                <h3>{scenario.title}</h3>
                <p>{scenario.description}</p>
                <span className="start-arrow">→</span>
              </div>
            ))}
          </div>
        )}

        {step === 'questions' && currentQuestion && (
          <div className="question-container">
            <div className="progress-bar">
              <span>Step {history.length + 1}</span>
              <button onClick={goBack} className="back-btn">← Back</button>
            </div>

            <div className="question-card">
              <h2>{currentQuestion.text}</h2>

              {currentQuestion.type === 'yes-no' && (
                <div className="answer-buttons">
                  <button 
                    className="answer-btn"
                    onClick={() => answerQuestion(currentQuestion.yes)}
                    disabled={loading}
                  >
                    Yes
                  </button>
                  <button 
                    className="answer-btn"
                    onClick={() => answerQuestion(currentQuestion.no)}
                    disabled={loading}
                  >
                    No
                  </button>
                </div>
              )}

              {currentQuestion.type === 'choice' && (
                <div className="answer-buttons">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      className="answer-btn"
                      onClick={() => answerQuestion(option.next)}
                      disabled={loading}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'input' && (
                <div className="input-answer">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your answer..."
                    className="answer-input"
                  />
                  <button
                    className="answer-btn"
                    onClick={() => answerQuestion(currentQuestion.next)}
                    disabled={loading || !inputValue}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 'solution' && currentSolution && (
          <div className="solution-container">
            <div className="solution-header">
              <h2>{currentSolution.title}</h2>
              <button onClick={restart} className="restart-btn">Start Over</button>
            </div>

            <div className="solution-card">
              <h3>Steps to Fix:</h3>
              <ol className="solution-steps">
                {currentSolution.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>

              {currentSolution.commands.length > 0 && (
                <div className="solution-commands">
                  <h3>Helpful Commands:</h3>
                  {currentSolution.commands.map((command, index) => (
                    <div key={index} className="command-item">
                      <code>{command}</code>
                      <button 
                        onClick={() => copyCommand(command)}
                        className="copy-btn-small"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={restart} className="btn btn-primary" style={{ marginTop: '24px' }}>
                Troubleshoot Another Issue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Troubleshoot;