import PropTypes from 'prop-types';

const ViewTypes = {
  children: PropTypes.node.isRequired,
  views: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired,
    }),
  ).isRequired,
};

export default ViewTypes;
