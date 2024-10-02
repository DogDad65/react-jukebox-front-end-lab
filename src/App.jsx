import { useState, useEffect } from "react";
import TrackList from "./components/TrackList";
import TrackForm from "./components/TrackForm";
import NowPlaying from "./components/NowPlaying";
import { getTracks } from "./services/trackService";

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);

  // Fetch the tracks from the server when the app loads
  useEffect(() => {
    const fetchTracks = async () => {
      const data = await getTracks();
      setTracks(data);
    };
    fetchTracks();
  }, []);

  // Function to handle adding a new track
  const handleAddTrack = (newTrack) => {
    setTracks([...tracks, newTrack]);
  };

  const handlePlay = (track) => {
    setNowPlaying(track);
  };

  const handleEdit = (track) => {
    setCurrentTrack(track);
    setShowForm(true);
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
          onAddTrack={handleAddTrack} // Pass the function to TrackForm
        />
      )}
      <TrackList tracks={tracks} onPlay={handlePlay} onEdit={handleEdit} />
      <NowPlaying currentTrack={nowPlaying} />
    </div>
  );
};

export default App;
