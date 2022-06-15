import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loader } from 'components';
import { ReactComponent as UnsplashLogo } from 'assets/images/unsplash-brands.svg';

export const AboutPage = () => {
  const { isLoading } = useSelector((state) => state.images);

  return (
    <div className='container'>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <header>
            <h1>Photos for everyone</h1>
            <p style={{ paddingRight: 80, marginBottom: 20 }}>
              Over 3 million free high-resolution images brought to you by the
              world’s most generous community of photographers.
            </p>
            <Link
              to='/'
              style={{
                background: '#3498db',
                padding: '10px 20px',
                borderRadius: 5,
              }}
            >
              Start Browsing
            </Link>
          </header>
          <UnsplashLogo
            style={{
              width: 300,
              height: 300,
              fill: '#9B59B6',
            }}
          />
        </div>
      )}
    </div>
  );
};
