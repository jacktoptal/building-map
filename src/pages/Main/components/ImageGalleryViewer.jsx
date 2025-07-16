import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ImageGalleryViewer = () => {
  const images = [
    {
      original: 'images/1.jpg',
      thumbnail: 'images/1.jpg',
    },
    {
      original: 'images/2.jpg',
      thumbnail: 'images/2.jpg',
    },
    {
      original: 'images/3.jpg',
      thumbnail: 'images/3.jpg',
    },
  ];

  return (
    <ImageGallery
      items={images}
      showThumbnails={true}
      showFullscreenButton={true}
      showPlayButton={false}
    />
  );
};

export default ImageGalleryViewer;
