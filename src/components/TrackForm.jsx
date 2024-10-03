import { useState, useEffect } from 'react';
import { createTrack, updateTrack } from '../services/trackService';

const TrackForm = ({ currentTrack, onClose, onAddTrack, onEditTrack }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: ''
  });

  // Populate form fields if editing a track
  useEffect(() => {
    if (currentTrack) {
      setFormData({
        title: currentTrack.title,
        artist: currentTrack.artist
      });
    }
  }, [currentTrack]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentTrack) {
      // Call updateTrack and update the parent state
      try {
        const updatedTrack = await updateTrack(currentTrack._id, formData);
        onEditTrack(updatedTrack);  // Call onEditTrack to update state in App.jsx
      } catch (error) {
        console.error('Error updating track:', error);
      }
    } else {
      const newTrack = await createTrack(formData);
      onAddTrack(newTrack);
    }

    onClose();  // Close the form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentTrack ? 'Edit Track' : 'Add New Track'}</h2>
      <label>
        Title:
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </label>
      <label>
        Artist:
        <input
          type="text"
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
          required
        />
      </label>
      <button type="submit">{currentTrack ? 'Update Track' : 'Add Track'}</button>
    </form>
  );
};

export default TrackForm;
