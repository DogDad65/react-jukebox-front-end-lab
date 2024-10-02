const NowPlaying = ({ currentTrack }) => {
    if (!currentTrack) return null;
  
    return (
      <div>
        <h2>Now Playing</h2>
        <h3>{currentTrack.title} by {currentTrack.artist}</h3>
      </div>
    );
  };
  
  export default NowPlaying;
  