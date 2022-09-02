import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import fetchPixabay from 'services/fetchPixabay';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ searchValue }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setImages([]);
    setPage(1);
  }, [searchValue]);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
    setStatus(Status.PENDING);
    fetchPixabay(searchValue, page)
      .then(image => {
        if (image.hits.length) {
          setImages(prevState => {
            return [...prevState, ...image.hits];
          });
          setStatus(Status.RESOLVED);
        } else {
          return Promise.reject(new Error(`Нет картинок ${searchValue}`));
        }
      })
      .catch(error => {
        toast.error(error.message);
        setStatus(Status.REJECTED);
      });
  }, [searchValue, page]);

  useEffect(() => {
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
  });

  const loadMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const showModalFunk = event => {
    setImageModal(images.find(img => img.webformatURL === event.target.src));
    toggleModal();
  };

  return (
    <>
      <ul className={s.imageGallery}>
        {images.map(({ id, tags, webformatURL }) => (
          <ImageGalleryItem
            key={id}
            image={webformatURL}
            name={tags}
            onClick={showModalFunk}
          />
        ))}
      </ul>
      {status === Status.PENDING && <Loader />}
      {status === Status.RESOLVED && <Button onClick={loadMoreClick} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={imageModal.largeImageURL} alt={imageModal.tags} />
        </Modal>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string,
};
