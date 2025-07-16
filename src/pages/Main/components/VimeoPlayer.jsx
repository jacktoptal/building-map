import React from 'react';
import ReactPlayer from 'react-player/vimeo';

const VimeoPlayer = ({videoUrl, width = '640px', height = '360px'}) => {
  return (
    <ReactPlayer
      url={videoUrl}
      width={width}
      height={height}
      controls
      playing={false}
    />
  );
};

export default VimeoPlayer;
