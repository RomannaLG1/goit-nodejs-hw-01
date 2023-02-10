const fs = require("fs").promises;
const path = require("node:path");
const contact = require("./contact");
const { hideBin } = require("yargs/helpers");
const yargs = require("yargs");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contact.listContacts();

      break;

    case "get":
      const findContact = await contact.getContactById(id);

      if (!findContact) {
        throw new Error(`Contact with id = ${id} not found`);
      }
      break;

    case "add":
      const newContact = await contact.addContact(name, email, phone);
      break;

    case "remove":
      const removeContact = await contact.removeContact(id);
      if (!removeContact) {
        throw new Error(`Contact with id = ${id} not found`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
