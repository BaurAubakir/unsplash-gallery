import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';

import styles from './styles/Images.module.scss';
import { ReactComponent as Heart } from './icons/heart-solid.svg';
import { ImageModal } from './ImageModal';
import { setCurrent, search } from 'features/images/imageSlice';

export const Images = ({ images }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(search({ text }));

    setText('');
  };

  const showModal = show && (
    <ImageModal setShow={setShow} images={images} setCurrent={setCurrent} />
  );

  return (
    <Fragment>
      <section className={styles.images}>
        {images.length === 0 ? (
          <h3>No images to show...</h3>
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className={styles.image}
              onClick={() => {
                dispatch(setCurrent(image.id));
                setShow(true);
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${image.urls.regular})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
                  border: '3px #ecf0f1 solid',
                }}
              />
              <div className={styles.description}>
                <div className={styles.author}>
                  <div className={styles.authorName}>
                    <img
                      src={image.user.profile_image.medium}
                      alt={image.user.name}
                    />
                    <p>{image.user.name}</p>
                  </div>
                  <span>
                    <Heart />
                    {image.likes}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
      <section className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor='text' className={styles.formLabel}>
              Look for something
            </label>
            <input
              type='text'
              className={styles.formControl}
              id='text'
              name='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className={styles.submit} type='submit'>
              Search
            </button>
          </div>
        </form>
      </section>
      {showModal}
    </Fragment>
  );
};
