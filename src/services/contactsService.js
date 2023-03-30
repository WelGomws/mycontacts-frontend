import ContactMapper from './mappers/contactMapper';
import HttpClient from './utils/httpClient';
import EventManager from '../lib/eventManager';
import contactLocalDataSource from './utils/localDataSource';
import delay from '../utils/delay';

class ContactsService {

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
    this.eventManager = new EventManager()
    this.list = []

    setInterval(async () => {
      const isConnected = window.navigator.onLine
      const haveItens = !!this.list.length

      console.log('set interval start')
      console.log('isConnected? ', isConnected)
      console.log('haveItens? ', haveItens)

      if (isConnected && haveItens) {
        console.log(`List have ${this.list.length} items.`)
        for (const [index, request] of this.list.entries()) {

          console.log(`Trying "${request.name}"...`)
          await request.func()
          this.list.splice(index, 1)
          console.log('lista no final: ', this.list)
        }
      }
    }, 3000)
  }

  // async listContacts(orderBy = 'asc') {
  async listContacts(setterContactsList, orderBy = 'asc') {

    // cache first
    const cacheContacts = contactLocalDataSource.listContacts(orderBy)

    if (cacheContacts) {
      setterContactsList(cacheContacts)
    }

    await delay(5000)

    try {
      const networkContacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`);
      if (networkContacts.length) {
        contactLocalDataSource.saveContacts(networkContacts)
        setterContactsList(networkContacts.map(ContactMapper.toDomain))
      }
    } catch (e) {
      console.log('algo deu errado no GET /contacts')
      console.log(e)
    }
  }

  updateContacts() {

    if (this.eventManager.listeners.size) {
      // console.log('there are listeners')

      // cache first
      this.eventManager.emit('updateContacts', this.getCacheData())

      delay(3000).then(() => {
        try {
          this.httpClient.get(`/contacts`)
            .then(networkContacts => {
              if (networkContacts.length) {
                contactLocalDataSource.saveContacts(networkContacts)
                // console.log('cache atualizado')
              }
              this.eventManager.emit('updateContacts', this.getCacheData())
            })
        } catch (e) {
          console.log('algo deu errado no GET /contacts')
          console.log(e)
        }
      })

    }
  }

  attach(handler) {
    // console.log('attach was called')
    this.eventManager.on('updateContacts', handler)
    this.updateContacts()
    // handler(this.getCacheData())
    // console.log(this.eventManager.listeners)
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

export default new ContactsService();
