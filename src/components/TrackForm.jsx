import { useState, useEffect } from 'react';
import { createTrack, updateTrack } from '../services/trackService';

const TrackForm = ({ currentTrack, onClose, onAddTrack }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: ''
  });

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
      await updateTrack(currentTrack._id, formData);
    } else {
      const newTrack = await createTrack(formData);
      onAddTrack(newTrack);  
    }
    onClose(); 
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
