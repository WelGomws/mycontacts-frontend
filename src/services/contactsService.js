import ContactMapper from './mappers/contactMapper';
import HttpClient from './utils/httpClient';
import contactLocalDataSource from './utils/localDataSource';

// const log = (s) => console.log(s)

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    let contacts
    contacts = contactLocalDataSource.listContacts(orderBy)
    if (!contacts) {
      contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`);
      contactLocalDataSource.saveContacts(contacts)
    }
    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id) {
    const contact = await this.httpClient.get(`/contacts/${id}`);
    return ContactMapper.toDomain(contact);
  }

  createContact(contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.post('/contacts', { body });
  }

  updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.put(`/contacts/${id}`, { body });
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
