import { useState, useEffect, useRef } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

import { ReactComponent as Bars } from './icons/bars-solid.svg';
import { ReactComponent as Xmark } from './icons/xmark-solid.svg';
import styles from './styles/Navbar.module.scss';
import { useMatchMedia } from 'hooks';

export const Navbar = () => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const { isMobile } = useMatchMedia();

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setShow(false);
    }
  };

  const handleOtsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false);
    document.addEventListener('click', handleOtsideClick, false);
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
      document.removeEventListener('click', handleOtsideClick, false);
    };
  });

  const showMenu = show && (
    <MobileMenu className={styles.mobileMenu} onClick={() => setShow(false)}>
      <CustomLink to='/about' onClick={() => setShow(false)}>
        About
      </CustomLink>
    </MobileMenu>
  );
  return (
    <header className={styles.navbar} ref={ref}>
      <ul className={styles.logo}>
        <CustomLink to='/'>Unsplash Gallery</CustomLink>
      </ul>
      {isMobile ? (
        <button className={styles.menuIcon} onClick={() => setShow(true)}>
          <Bars style={{ width: 25, height: 25, fill: '#3498db' }} />
        </button>
      ) : (
        <Menu className={styles.menu}>
          <CustomLink to='/about'>About</CustomLink>
        </Menu>
      )}

      {showMenu}
    </header>
  );
};

const Menu = ({ children, className }) => (
  <nav className={className}>
    <ul className={styles.navLinks}>{children}</ul>
  </nav>
);

const MobileMenu = ({ children, className, onClick }) => (
  <nav
    className={className}
    style={{
      animation: 'fadeInLeft 0.3s ease',
    }}
  >
    <Xmark className={styles.xmark} onClick={onClick} />
    <ul>{children}</ul>
  </nav>
);

const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li>
      <Link className={isActive ? 'active' : ''} to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};
