import { useState, useEffect, useImperativeHandle } from 'react';
import useErrors from '../../hooks/useErrors';
import isEmailValid from '../../utils/isEmailValid';
import formartPhone from '../../utils/formartPhone';
import CategoriesService from '../../services/categoriesService';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingcategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const safeAsyncAction = useSafeAsyncAction();

  useImperativeHandle(
    ref,
    () => ({
      setFieldValues: (contact) => {
        setName(contact.name);
        setEmail(contact.email ?? '');
        setPhone(formartPhone(contact.phone));
        setCategoryId(contact.category.id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
        setPhone('');
        setCategoryId('');
      },
    }),
    []
  );

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  const isFormValid = name && errors.length === 0;

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();

        safeAsyncAction(() => {
          setCategories(categoriesList);
        });
      } catch {
      } finally {
        safeAsyncAction(() => {
          setIsLoadingCategories(false);
        });
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories, safeAsyncAction]);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formartPhone(event.target.value));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await onSubmit({ name, email, phone, categoryId });
    safeAsyncAction(() => {
      setIsSubmitting(false);
    });
  };

  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingcategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  };
}
