import { deleteTrack } from '../services/trackService';

const TrackList = ({ tracks, onPlay, onEdit, setTracks }) => {
  
  const handleDelete = async (id) => {
    await deleteTrack(id);
    setTracks(tracks.filter((track) => track._id !== id)); // Update the tracks list after deleting
  };

  return (
    <div>
      <div className="track-list">
        {tracks.map((track) => (
          <div key={track._id} className="track-card">
            <h3>{track.title}</h3>
            <p>by {track.artist}</p>
            <button onClick={() => onPlay(track)}>Play</button>
            <button onClick={() => onEdit(track)}>Edit</button>
            <button onClick={() => handleDelete(track._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackList;
