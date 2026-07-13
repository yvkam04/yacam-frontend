import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function CameraLive({ streamUrl = 'https://history-tubes-jelsoft-forge.trycloudflare.com/camera1/index.m3u8' }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [streamUrl]);

  return (
    <div>
      <h3>Caméra en direct</h3>
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