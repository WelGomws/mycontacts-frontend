import PropTypes from 'prop-types';
import { StyledSpinner } from './styles';

export default function Spinner({ size }) {
  return (
    <StyledSpinner size={size}>
      <svg id="triangle" width={size} height={size} viewBox="-3 -4 39 39">
        <polygon fill="transparent" strokeWidth={2} points="16,0 32,32, 0,32" />
      </svg>
    </StyledSpinner>
  );
}

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 20,
};
