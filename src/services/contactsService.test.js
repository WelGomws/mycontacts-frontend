import EventManager from '../lib/eventManager';
import ContactsService from './contactsService'

describe('contacts service', () => {

  test('init ContactsService', async () => {

    const makeMockLocalDataSource = () => {

      const source = {
        contacts: []
      }

      return {
        read() {
          console.log(source)
          return source.contacts
        },
        save(_contactsList) {
          _contactsList.forEach((item) => {
            source.contacts.push(item)
          })
        },
      }
    }
    const contactList = [{ name: 'Well' }, { name: 'Tom' }, { name: "Raquel" }, { name: 'Fabio' }]

    const mockRemoteDataSource = {
      create() { },
      update() { },
      list: async function() {
        return contactList
      },
    }

    const mockLocalDataSource = makeMockLocalDataSource()

    const cs = new ContactsService(
      mockLocalDataSource,
      mockRemoteDataSource,
      new EventManager()
    )

    expect(mockLocalDataSource.read()).toStrictEqual([])

    cs.attach(() => {})

    await new Promise((res) => setTimeout(() => res(), 1))

    expect(mockLocalDataSource.read()).toEqual(
      expect.arrayContaining(
        contactList
      )
    )
  })
})
