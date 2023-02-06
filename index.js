const fs = require("fs").promises;
const path = require("node:path");
const contact = require("./contact");
const { hideBin } = require("yargs/helpers");
const yargs = require("yargs");
const argv = require("yargs").argv;

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone, data }) => {
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

    // case "update":
    //   const updateContact = await contact.updateContact(id, data);
    //   console.log(updateContact);
    //   if (!updateContact) {
    //     throw new Error(`Contact with id = ${id} not found`);
    //   }
    //   break;

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

const id = "3";
// const name = "Name";
// const email = "Email";
// const phone = "09999";
// const data = { name: "9999999" };
// invokeAction({ action: "remove", id });
// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// console.log(argv);
invokeAction(argv);
