let temp1 = {
    uid: "abc123",
    isFavourite: true,
    name: {
      first: "Kushal",
      last: "Shah"
    },
    job: {
      companyName: "Sprinklr",
      title: "Product Engineer"
    },
    email: {
      emailID: "kushal.shah@sprinklr.com",
    },
    phone: {
      number: "7043494349",
    }
};

let temp2 = {
    uid: "pqr123",
    isFavourite: false,
    name: {
      first: "Kush",
      last: "Shah"
    },
    job: {
      companyName: "Sprinklr",
      title: "Product Engineer"
    },
    email: {
      emailID: "",
    },
    phone: {
      number: "123454321",
    }
};

class ContactList {
    constructor() {
        this.contactList = [];
    }

    add(obj) {
        this.contactList.push(obj);
    }

    remove(id) {
        this.contactList = this.contactList.filter(obj => obj.uid !== id);
    }

    find(id) {
      return (this.contactList.filter(contact => contact.uid === id))[0];
    }

    set(updatedList) {
      this.contactList = updatedList;
    }

    updateObject(id, newObj) {
      this.contactList = this.contactList.map(contact => {
        if(contact.uid === id) {
          return newObj;
        } else {
          return contact;
        } 
      })
    }
    
}

const ContactListInstance = new ContactList();

ContactListInstance.add(temp1);
ContactListInstance.add(temp2);

export default ContactListInstance;
