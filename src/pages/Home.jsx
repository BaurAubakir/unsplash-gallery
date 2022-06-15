import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Images, Loader } from 'components';
import { getImages, reset } from 'features/images/imageSlice';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { images, isLoading, currentImage } = useSelector(
    (state) => state.images
  );

  useEffect(() => {
    dispatch(getImages());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div className='container'>
      {isLoading ? <Loader /> : <Images images={images} />}
    </div>
  );
};
