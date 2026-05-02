import { useState, useEffect } from 'react';
import { fetchScenarios, fetchScenario, fetchQuestion, fetchSolution } from '../utils/api';

export function useTroubleshoot() {
  const [step, setStep] = useState('scenarios');
  const [scenarios, setScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentSolution, setCurrentSolution] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchScenarios()
      .then(res => { if (res.status === 'success') setScenarios(res.data); })
      .catch(err => console.error('Failed to load scenarios:', err))
      .finally(() => setLoading(false));
  }, []);

  const selectScenario = async (scenarioId) => {
    setLoading(true);
    try {
      const res = await fetchScenario(scenarioId);
      if (res.status === 'success') {
        setCurrentScenario(res.data.scenario);
        setCurrentQuestion(res.data.firstQuestion);
        setHistory([]);
        setStep('questions');
      }
    } catch (err) {
      console.error('Failed to load scenario:', err);
    } finally {
      setLoading(false);
    }
  };

  const answerQuestion = async (nextId) => {
    setLoading(true);
    setHistory(prev => [...prev, currentQuestion]);
    try {
      if (nextId.startsWith('sol_')) {
        const res = await fetchSolution(nextId);
        if (res.status === 'success') {
          setCurrentSolution(res.data);
          setStep('solution');
        }
      } else {
        const res = await fetchQuestion(nextId);
        if (res.status === 'success') setCurrentQuestion(res.data);
      }
    } catch (err) {
      console.error('Failed to load next step:', err);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      setCurrentQuestion(history[history.length - 1]);
      setHistory(prev => prev.slice(0, -1));
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
  };

  return {
    step,
    scenarios,
    currentScenario,
    currentQuestion,
    currentSolution,
    history,
    loading,
    selectScenario,
    answerQuestion,
    goBack,
    restart,
  };
}
