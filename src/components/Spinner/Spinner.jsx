import { Box } from './Spinner.styled';
import { Rings } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const Spinner = props => (
  <Box>
    <Rings {...props} color="#1976d2" ariaLabel="loading" />
  </Box>
);

Spinner.propTypes = {
  props: PropTypes.object,
};
