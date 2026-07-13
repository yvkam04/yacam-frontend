import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function CameraLive({ streamUrl = 'https://history-tubes-jelsoft-forge.trycloudflare.com/camera1/index.m3u8' }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    let hls;
    setError(null);

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          setError("Flux caméra indisponible pour le moment. Vérifiez que la caméra, MediaMTX et le tunnel sont bien actifs.");
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
    } else {
      setError("Votre navigateur ne supporte pas la lecture de ce flux vidéo.");
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [streamUrl]);

  return (
    <div>
      <h3>Caméra en direct</h3>
      {error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      )}
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        style={{ width: '100%', maxWidth: '800px', backgroundColor: '#000' }}
      />
    </div>
  );
}