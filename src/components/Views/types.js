import PropTypes from 'prop-types';

const ViewTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired,
      path: PropTypes.string,
      default: PropTypes.boolean,
    }),
  ).isRequired,
};

export default ViewTypes;
