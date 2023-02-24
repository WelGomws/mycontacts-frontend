import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

function ToastMessage({ message, onRemoveMessage, isLeaving, animatedRef }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      ref={animatedRef}
      tabIndex={0}
      role="button"
      type={message.type}
      onClick={handleRemoveToast}
      isLeaving={isLeaving}
    >
      {message.type === 'danger' && (
        <img src={xCircleIcon} alt="X circle icon" />
      )}
      {message.type === 'success' && (
        <img src={checkCircleIcon} alt="Check circle icon" />
      )}
      <strong>{message.text}</strong>
    </Container>
  );
}

export default memo(ToastMessage);

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired,
};
