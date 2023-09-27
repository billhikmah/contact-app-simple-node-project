const yargs = require("yargs");
const {
  saveContact,
  showList,
  showDetail,
  deleteContact,
} = require("./contacts");

//Add Contact
yargs
  .command({
    command: "add",
    describe: "Add new contact",
    builder: {
      name: { describe: "Enter Full Name", demandOption: true, type: "string" },
      email: { describe: "Enter Email", demandOption: false, type: "string" },
      phone: {
        describe: "Enter Phone Number",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      saveContact(argv.name, argv.email, argv.phone);
    },
  })
  .demandCommand();

// Show contact list
yargs.command({
  command: "list",
  describe: "Show contact list",
  handler() {
    showList();
  },
});

//Show contact detail
yargs.command({
  command: "detail",
  describe: "Show contact detail by name",
  builder: {
    name: { describe: "Enter Name", demandOption: true, type: "string" },
  },
  handler(argv) {
    showDetail(argv.name);
  },
});

//Delete contact

yargs.command({
  command: "delete",
  describe: "Remove contact by name",
  builder: {
    name: { describe: "Enter Name", demandOption: true, type: "string" },
  },
  handler(argv) {
    deleteContact(argv.name);
  },
});

yargs.parse();
