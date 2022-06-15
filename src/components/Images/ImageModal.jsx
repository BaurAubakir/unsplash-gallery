import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles/Images.module.scss';
import { ReactComponent as Xmark } from './icons/xmark-solid.svg';
import { ReactComponent as Heart } from './icons/heart-solid.svg';
import { ReactComponent as LeftArrow } from './icons/caret-left-solid.svg';
import { ReactComponent as RightArrow } from './icons/caret-right-solid.svg';

export const ImageModal = ({ setShow, images, setCurrent }) => {
  const { currentImage } = useSelector((state) => state.images);
  const dispatch = useDispatch();

  const handlePrevImage = () => {
    const indexes = images.map((image, i) => {
      return {
        index: i,
        id: image.id,
      };
    });
    const currentIndex = indexes.find((i) => i.id === currentImage.id);
    const prevIndex = currentIndex.index - 1;
    const prevId = images.find((image, i) => i === prevIndex);

    if (prevIndex >= 0 && prevId !== 'undefined') {
      dispatch(setCurrent(prevId.id));
    }
  };

  const handleNextImage = () => {
    const indexes = images.map((image, i) => {
      return {
        index: i,
        id: image.id,
      };
    });
    const currentIndex = indexes.find((i) => i.id === currentImage.id);
    const nextIndex = currentIndex.index + 1;
    const nextId = images.find((image, i) => i === nextIndex);

    if (nextIndex <= 17 && nextId !== 'undefined') {
      dispatch(setCurrent(nextId.id));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setShow(false);
    } else if (e.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  });

  return (
    <div className={styles.container} style={{ animation: 'fadeIn 0.2s ease' }}>
      <div
        className={styles.modal}
        style={{
          backgroundImage: `url(${currentImage && currentImage.urls.regular})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
          border: '3px #ecf0f1 solid',
          transition: 'all 0.1s ease',
        }}
      >
        <Xmark className={styles.xmark} onClick={() => setShow(false)} />
        <div className={styles.author}>
          <div className={styles.authorName}>
            <img
              src={currentImage && currentImage.user.profile_image.medium}
              alt={currentImage && currentImage.user.name}
            />
            <p>{currentImage && currentImage.user.name}</p>
          </div>
          <span>
            <Heart />
            {currentImage && currentImage.likes}
          </span>
        </div>
        <div className={styles.slideButtons}>
          <LeftArrow onClick={handlePrevImage} />
          <RightArrow onClick={handleNextImage} />
        </div>
      </div>
    </div>
  );
};
