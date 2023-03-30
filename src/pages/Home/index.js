import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import useHome from './useHome';
import InputSearch from './components/inputSearch';
import Header from './components/header';
import ErrorStatus from './components/errorStatus';
import EmptyList from './components/emptyList';
import SearchNotFound from './components/searchNotFound';
import ContactsList from './components/contactsList';
import { Container } from './styles';

export default function Home() {
  const {
    isLoading,
    isDeleteModalVisible,
    contactBeingDeleted,
    isLoadingDelete,
    contacts,
    searchTerm,
    filteredContacts,
    hasError,
    orderBy,
    handleCloseDeleteModal,
    handleCreateNewContact,
    handleConfirmDeleteContact,
    handleChangeSearchTerm,
    // handleTryAgain,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isEmptyList = !hasError && !isLoading && !hasContacts;
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1;

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}
      <Header
        handleClick={handleCreateNewContact}
        hasError={hasError}
        qtyContacts={contacts.length}
        qtyFilteredContacts={filteredContacts.length}
      />
      {/* {hasError && <ErrorStatus onTryAgain={handleTryAgain} />} */}
      {isEmptyList && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}
      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />
          <Modal
            danger
            visible={isDeleteModalVisible}
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
            isLoading={isLoadingDelete}
          >
            <p>Esta ação não poderá ser desfeita.</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
