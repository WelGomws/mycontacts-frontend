/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Header({ hasError, qtyContacts, qtyFilteredContacts }) {
  const alignment = hasError
    ? 'flex-end'
    : qtyContacts > 0
      ? 'space-between'
      : 'center';

  return (
    <Container justifyContent={alignment}>
      {!hasError && qtyContacts > 0 && (
        <strong>
          {qtyFilteredContacts}
          {qtyFilteredContacts === 1 ? ' contato' : ' contatos'}
        </strong>
      )}
      <Link to="/new">Novo Contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyContacts: PropTypes.number.isRequired,
  qtyFilteredContacts: PropTypes.number.isRequired,
};
