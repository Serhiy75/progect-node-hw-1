const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactsArray = await listContacts();
    const results = contactsArray.find(({ id }) => id === contactId);
    return results || null;
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  const contactsArray = await listContacts();
  const contactIndex = contactsArray.findIndex(({ id }) => id === contactId);
  const result = contactsArray[contactIndex];
  if (!result) {
    return null;
  } else {
    contactsArray.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
    return result;
  }
}

async function addContact(data) {
  try {
    const contactsArray = await listContacts();

    contactsArray.push({ id: nanoid(), ...data });
    await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
}

async function updateContactsById(id, data) {
  const contactsArray = await listContacts();
  const index = contactsArray.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contactsArray[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return contactsArray[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactsById,
};
