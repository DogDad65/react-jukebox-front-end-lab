const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

export const getTracks = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

// Add more functions for adding, updating, deleting tracks...
