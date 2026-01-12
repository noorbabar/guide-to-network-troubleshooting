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