// contacts.js
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(_dirname, "/db", "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
  // ...твій код. Повертає масив контактів.
}

async function getContactById(contactId) {
  try {
    const contactsArray = await listContacts();
    const results = contactsArray.find(({ id }) => id === contactId);
    return results || null;
  } catch (err) {
    console.log(err.message);
  }
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
  const contactsArray = await listContacts();
  const index = contactsArray.findIndex(({ id }) => id === contactId);
  const result = contactsArray[index];
  if (!result) {
    return null;
  } else {
    contactsArray.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
    return result;
  }
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
  try {
    const contactsArray = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contactsArray.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
    return newContact;
  } catch (err) {
    console.log(err.message);
  }

  // ...твій код. Повертає об'єкт доданого контакту.
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
