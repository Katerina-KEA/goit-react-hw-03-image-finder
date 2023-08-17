import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GalleryList } from './ImageGallery.styled';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import Modal from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    showModal: false,
    largeSrc: '',
    imgAlt: '',
  };
    //Modal window. Открытие или закрытие модального окна ( зависит от пред. значения)
    ToggleModal = () => {
    this.setState(({ showModal }) => ({
        showModal: !showModal,
      }))
  };

  // открытие модального окна, кликая на image
  onImageClick = (largeSrc, imgAlt) => {
    // console.log(largeSrc);
    // console.log(imgAlt);

     this.toggleModal();

     this.setState({ largeSrc, imgAlt });
  };

  render() {
    const { gallery } = this.props;

    const { showModal, largeSrc, imgAlt } = this.state;

    return (
      <>
        <GalleryList className="ImageGallery">
          {gallery.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem // items с изображениями
              key={id}
              imgSrc={webformatURL}
              imgAlt={tags}
              largeSrc={largeImageURL}
              onImageClick={this.onImageClick}
            />
          ))}
        </GalleryList>
        {/*  Открытие модального окна по условию*/}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeSrc} alt={imgAlt} />
          </Modal>
        )}
      </>
    );
  }

}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;

