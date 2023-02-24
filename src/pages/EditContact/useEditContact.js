import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import contactsService from '../../services/contactsService';
import toast from '../../utils/toast';

export default function useEditContact() {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await contactsService.getContactById(id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        });
      }
    }

    loadContact();
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const res = await contactsService.updateContact(id, contact);

      safeAsyncAction(() => {
        setContactName(res.name);
        toast({
          type: 'success',
          text: 'Contato editado com sucesso!',
        });
      });
    } catch (error) {
      safeAsyncAction(() => {
        toast({
          type: 'danger',
          text: 'Ocorreu um erro ao editar o contato!',
        });
      });
    }
  }

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
