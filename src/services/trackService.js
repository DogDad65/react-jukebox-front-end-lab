const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

export const getTracks = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const createTrack = async (trackData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trackData),
  });
  return response.json();
};

export const updateTrack = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/${id}`, { // Use BASE_URL here
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update track');
  }

  return response.json();  // Return the updated track
};

export const deleteTrack = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};
