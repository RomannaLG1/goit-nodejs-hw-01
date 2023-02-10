const fs = require("fs").promises;
const path = require("node:path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
const updateContacts = async (list) => {
  await fs.writeFile(contactsPath, JSON.stringify(list));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  console.table(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findContact = contacts.filter((elm) => elm.id === contactId.toString());
  if (findContact.length === 0) {
    return null;
  }
  console.table(findContact);
  return findContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const findIdx = contacts.findIndex((elm) => elm.id === contactId.toString());
  if (findIdx === -1) {
    return null;
  }
  const filtredContacts = contacts.filter((_, idx) => idx !== findIdx);
  console.table(filtredContacts);
  console.table(contacts[findIdx]);
  updateContacts(filtredContacts);

  return contacts[findIdx];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  updateContacts(contacts);
  console.table(contacts);
  console.table(newContact);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
