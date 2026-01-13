const API_URL = 'http://127.0.0.1:5000';

export const fetchCommands = async () => {
  try {
    const response = await fetch(`${API_URL}/api/commands`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching commands:', error);
    throw error;
  }
};

export const fetchCommandById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/commands/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching command:', error);
    throw error;
  }
};

export const fetchScenarios = async () => {
  try {
    const response = await fetch(`${API_URL}/api/troubleshooting/scenarios`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching scenarios:', error);
    throw error;
  }
};

export const fetchScenario = async (scenarioId) => {
  try {
    const response = await fetch(`${API_URL}/api/troubleshooting/scenario/${scenarioId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching scenario:', error);
    throw error;
  }
};

export const fetchQuestion = async (questionId) => {
  try {
    const response = await fetch(`${API_URL}/api/troubleshooting/question/${questionId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
};

export const fetchSolution = async (solutionId) => {
  try {
    const response = await fetch(`${API_URL}/api/troubleshooting/solution/${solutionId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching solution:', error);
    throw error;
  }
};

export const fetchKBArticles = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/api/knowledge-base/articles?${params}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching KB articles:', error);
    throw error;
  }
};

export const fetchKBArticle = async (articleId) => {
  try {
    const response = await fetch(`${API_URL}/api/knowledge-base/article/${articleId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching KB article:', error);
    throw error;
  }
};

export const fetchKBCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/api/knowledge-base/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching KB categories:', error);
    throw error;
  }
};