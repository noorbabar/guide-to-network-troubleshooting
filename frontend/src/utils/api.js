let _cache = null;

const getData = async () => {
  if (_cache) return _cache;
  const response = await fetch('/troubleshooting.json');
  _cache = await response.json();
  return _cache;
};

export const fetchScenarios = async () => {
  const data = await getData();
  return { status: 'success', data: data.scenarios };
};

export const fetchScenario = async (scenarioId) => {
  const data = await getData();
  const scenario = data.scenarios.find(s => s.id === scenarioId);
  const firstQuestion = data.questions[scenario.startQuestion];
  return { status: 'success', data: { scenario, firstQuestion } };
};

export const fetchQuestion = async (questionId) => {
  const data = await getData();
  const question = data.questions[questionId];
  return { status: 'success', data: question };
};

export const fetchSolution = async (solutionId) => {
  const data = await getData();
  const solution = data.solutions[solutionId];
  return { status: 'success', data: solution };
};
