import { useState, useEffect } from "react";
import TrackList from "./components/TrackList";
import TrackForm from "./components/TrackForm";
import NowPlaying from "./components/NowPlaying";
import { getTracks } from "./services/trackService";
import './App.css'; // Path to your CSS file


const App = () => {
  const [tracks, setTracks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      const data = await getTracks();
      setTracks(data);
    };
    fetchTracks();
  }, []);

  const handleAddTrack = (newTrack) => {
    setTracks([...tracks, newTrack]);
  };

  const handleEdit = (track) => {
    setCurrentTrack(track);   // Set the track to be edited
    setShowForm(true);        // Show the form for editing
  };

  const handleEditTrack = (updatedTrack) => {
    setTracks(tracks.map(track => track._id === updatedTrack._id ? updatedTrack : track));
    setShowForm(false);  
  };
  
  

  const handlePlay = (track) => {
    setNowPlaying(track);
  };

  return (
    <div>
      <h1>My Jukebox</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add New Track"}
      </button>
      {showForm && (
        <TrackForm
        currentTrack={currentTrack}
        onClose={() => setShowForm(false)}
        onAddTrack={handleAddTrack}
        onEditTrack={handleEditTrack}  
      />
      )}
      <TrackList tracks={tracks} onPlay={handlePlay} onEdit={handleEdit} setTracks={setTracks} />
      {nowPlaying && <NowPlaying currentTrack={nowPlaying} />}
    </div>
  );
};

export default App;
