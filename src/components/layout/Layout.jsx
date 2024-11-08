import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function Layout({ children }) {
  return (
    <div>
        <Navbar />
        <div className="content">
            {children}
        </div>
        <Footer />
    </div>
  );
}

// Add prop validation for `children`
Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
