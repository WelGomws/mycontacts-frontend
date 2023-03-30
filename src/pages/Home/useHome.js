import { useEffect, useState, useMemo, useCallback } from 'react';
import ContactsService from '../../services/contactsService';
// import EventManager from '../../lib/eventManager';
import toast from '../../utils/toast';

// const homeEventManager = new EventManager()

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );

  // const loadContacts = useCallback(async () => {
  //   try {
  //     setIsLoading(true);
  //     const contactsList = await ContactsService.listContacts(orderBy);
  //     setHasError(false);
  //     setContacts(contactsList);
  //   } catch (error) {
  //     setHasError(true);
  //     setContacts([]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [orderBy]);

  const handleCreateNewContact = () => {
    ContactsService.createContact({
      id: 'asdfasf',
      name: 'teste usuario',
      email: 'teste@mail.com',
      phone: '712783591824',
      // category_id: '321',
    })
  }

  useEffect(() => {
    // ContactsService.listContacts(setContacts)
    // homeEventManager.on('updateContactsList', (data) => setContacts(data))
    // ContactsService.listContacts((data) => homeEventManager.emit('updateContactsList', data))

    const updateContacts = (data) => setContacts(data)
    ContactsService.attach(updateContacts)

    return () => {
      ContactsService.detach(updateContacts)
    }
  }, []);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  // function handleTryAgain() {
  //   loadContacts();
  // }

  function handleDeleteContact(contact) {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);
      handleCloseDeleteModal();
      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDeleted.id)
      );
      toast({ type: 'success', text: 'Contato deletado com sucesso!' });
    } catch (error) {
      toast({ type: 'danger', text: 'Ocorreu um erro ao deletar o contato!' });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isLoading,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isLoadingDelete,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    filteredContacts,
    handleCreateNewContact,
    // handleTryAgain,
    hasError,
    handleToggleOrderBy,
    orderBy,
    handleDeleteContact,
  };
}
