// Header.jsx
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='w-100 h-bg text-white'>
      <div className='p-2'>
        <Link to="/" className='header-link'>
          <h1 className='text-white'>YOU<span className='link-color'>TIFY</span></h1>
        </Link>
      </div>
    </div>
  );
}

export default Header;
