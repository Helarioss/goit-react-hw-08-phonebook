import { Box } from './Spinner.styled';
import { Rings } from 'react-loader-spinner';

export const Spinner = props => (
  <Box>
    <Rings {...props} color="#1976d2" ariaLabel="loading" />
  </Box>
);
