import ContactMapper from '../mappers/contactMapper'

class ContactsLocalDataSource {

  listContacts(orderBy = 'asc') {
    const contacts = localStorage.getItem('@MyContacts:contacts')
    if (!contacts) return null
    const parsedContacts = JSON.parse(contacts)
    const arrayContacts = Object.values(parsedContacts)
    if (!arrayContacts.length) return null
    return arrayContacts.map(ContactMapper.toDomain).sort((a, b) => {
      if (orderBy === 'asc') {
        if (a.name.length > b.name.length) return 1
        return -1
      }
      if (a.name.length <= b.name.length) return 1
      return -1
    })
  }

  saveContacts(contacts) {
    console.log('save contacts: ', contacts)
    const contactsToPersist = contacts.map(ContactMapper.toPersistence)
    localStorage.setItem('@MyContacts:contacts', JSON.stringify(contactsToPersist))
    return true
  }

  saveNewContact(newContact) {
    console.log('save contact: ', newContact)
    // const newContactToPersist = ContactMapper.toPersistence(contact)
    const currentContacts = this.listContacts()
    this.saveContacts([newContact, ...currentContacts])
    // localStorage.setItem('@MyContacts:contacts', JSON.stringify(contactToPersist))
    return true
  }

  // async getContactById(id) {
  //   const contact = await this.httpClient.get(`/contacts/${id}`);
  //   return ContactMapper.toDomain(contact);
  // }

  // createContact(contact) {
  //   const body = ContactMapper.toPersistence(contact);
  //   return this.httpClient.post('/contacts', { body });
  // }

  // updateContact(id, contact) {
  //   const body = ContactMapper.toPersistence(contact);
  //   return this.httpClient.put(`/contacts/${id}`, { body });
  // }

  // deleteContact(id) {
  //   return this.httpClient.delete(`/contacts/${id}`);
  // }
}

export default new ContactsLocalDataSource();
