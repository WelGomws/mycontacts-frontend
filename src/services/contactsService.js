import ContactMapper from './mappers/contactMapper';
import HttpClient from './utils/httpClient';
import EventManager from '../lib/eventManager';
import contactLocalDataSource from './utils/localDataSource';

const EVENT_LIST_CONTACTS = 'listContacts'

export default class ContactsService {

  constructor(
    localDataSource,
    remoteDataSource,
    eventManager,
  ) {
    this.localDataSource = localDataSource
    this.remoteDataSource = remoteDataSource
    this.eventManager = eventManager
  }

  listContacts() {
    this.remoteDataSource.list()
      .then(networkContacts => {
        if (networkContacts.length) {
          this.localDataSource.save(networkContacts)
        }
        this.eventManager.emit(EVENT_LIST_CONTACTS, this.getCacheData())
      })
      .catch(e => {
        console.log('algo deu errado no GET /contacts')
        console.log(e)
        console.log('Listando contatos salvos em cache.')
        this.eventManager.emit(EVENT_LIST_CONTACTS, this.getCacheData())
      })
  }

  getCacheData() {
    return this.localDataSource.read()
  }

  attach(handler) {
    console.log(this.eventManager)
    this.eventManager.on('updateContacts', handler)
    this.listContacts()
  }
}



class _ContactsService {

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
    this.eventManager = new EventManager()
    this.list = []
  }

  updateContacts() {

    if (this.eventManager.listeners.size) {

      this.httpClient.get(`/contacts`)
        .then(networkContacts => {
          if (networkContacts.length) {
            contactLocalDataSource.saveContacts(networkContacts)
          }
          this.eventManager.emit('updateContacts', this.getCacheData())
        })
        .catch(e => {
          console.log('algo deu errado no GET /contacts')
          console.log(e)
          console.log('Listando contatos salvos em cache.')
          this.eventManager.emit('updateContacts', this.getCacheData())
        })
    }
  }

  attach(handler) {
    this.eventManager.on('updateContacts', handler)
    this.updateContacts()
  }

  detach(handler) {
    this.eventManager.removeListener(handler)
  }

  getCacheData() {
    const cacheContacts = contactLocalDataSource.listContacts()
    if (cacheContacts) {
      return cacheContacts
    }
    // console.log('cache is empty')
    return []
  }

  notify() {
    this.eventManager.emit('updateContacts', this.getCacheData())
  }

  async getContactById(id) {
    const contact = await this.httpClient.get(`/contacts/${id}`);
    return ContactMapper.toDomain(contact);
  }

  createContact(contact) {
    console.log('contact: ', contact)
    contactLocalDataSource.saveNewContact(contact)
    this.notify()

    console.log('online? ', window.navigator.onLine)

    const body = ContactMapper.toPersistence(contact);
    if (window.navigator.onLine) {
      this.httpClient.post('/contacts', { body }).then(
        (res) => console.log('Resultado da escrita: ', res)
      )
    } else {
      this.list.push({
        name: 'create contact',
        func: async () => this.httpClient.post('/contacts', { body })
      })
    }
  }

  updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.put(`/contacts/${id}`, { body });
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

// export default new ContactsService();
