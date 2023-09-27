const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

const loadContacts = () => {
  const contacts = JSON.parse(fs.readFileSync("./data/contacts.json"));
  return contacts;
};

const saveContact = (name, email, phoneNumber) => {
  const input = { name, email, phoneNumber };
  const contacts = loadContacts();

  //Check Duplicate
  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.log(
      chalk.red.inverse.bold("Contact already exists, enter a different name!")
    );
    return false;
  }

  //Check Email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email is not valid!"));
      return false;
    }
  }

  //Check Phone Number
  if (!validator.isMobilePhone(phoneNumber, "id-ID")) {
    console.log(chalk.red.inverse.bold("Phone number is not valid!"));
    return false;
  }

  contacts.push(input);
  fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.yellow.inverse.bold("Contact has been saved!"));
};

const showList = () => {
  const contacts = loadContacts();

  console.log(chalk.green.inverse.bold("Contact List"));
  if (contacts.length === 0) {
    return console.log(chalk.bold("Empty"));
  }
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.phoneNumber}`);
  });
};

const showDetail = (name) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
  if (!contact) {
    return console.log(chalk.red.inverse.bold(`Contact "${name}" not found`));
  }
  console.log(chalk.green.inverse.bold(`Contact Detail`));
  console.log(chalk.cyan(contact.name));
  console.log(chalk.cyan(contact.phoneNumber));
  if (contact.email) {
    console.log(chalk.cyan(contact.email));
  }
};

const deleteContact = (name) => {
  const contacts = loadContacts();
  const newContacts = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );
  if (contacts.length === newContacts.length) {
    return console.log(chalk.red.inverse.bold(`Contact "${name}" not found`));
  }

  fs.writeFileSync("./data/contacts.json", JSON.stringify(newContacts));
  console.log(chalk.blue.inverse.bold(`Contact "${name}" has been removed!`));
};
module.exports = { saveContact, showList, showDetail, deleteContact };
