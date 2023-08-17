import React from 'react';

import PropTypes from 'prop-types';
import { Photo } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ imgSrc, imgAlt, largeSrc, onImageClick }) => {
 
  return (
    <ImageGalleryItem className="ImageGalleryItem">
      <Photo
        src={imgSrc}
        alt={imgAlt}
        className="ImageGalleryItem-image"
        onClick={() => {
          onImageClick(largeSrc, imgAlt);
        }}
      />
    </ImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  largeSrc: PropTypes.string,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;