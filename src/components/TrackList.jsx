import  { useEffect, useState } from 'react';
import { getTracks, deleteTrack } from '../services/trackService';

const TrackList = ({ onPlay, onEdit }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const data = await getTracks();
      setTracks(data);
    };
    fetchTracks();
  }, []);

  const handleDelete = async (id) => {
    await deleteTrack(id);
    setTracks(tracks.filter((track) => track._id !== id));
  };

  return (
    <div>
      <h2>Track List</h2>
      {tracks.map((track) => (
        <div key={track._id}>
          <h3>{track.title} by {track.artist}</h3>
          <button onClick={() => onPlay(track)}>Play</button>
          <button onClick={() => onEdit(track)}>Edit</button>
          <button onClick={() => handleDelete(track._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
