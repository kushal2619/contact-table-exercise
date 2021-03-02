import React, { Component } from 'react'

import Header from "./Header.js";
import ContactBody from "./ContactBody.js";
import Modal from "./Modal.js"
import "./style/TableStyle.css";
//import ContactListInstance from './data/database.js';
import {fetchFromIDB, initIDB, closeIDB, updateIDB} from "./services/IndexedDBServices.js"
import { UPDATE_CONTACT_LIST, HANDLE_MODAL_DISPLAY } from "./data/constants.js";

export class Table extends Component {

  constructor() {
    super();
    this.state = {
      contactList: [],
      starredContactList: [],
      showModal: false,
      formContactDraft: null,
      modalContent: null,
    }
  }

  componentDidMount() {
    initIDB()
    .then(() => {
      console.log("Indexed DB successfully opened");
    })
    .catch(err => {
      console.log(err.message);
    })

  //   let test1 = {
  //     uid: "abc123",
  //     isFavourite: true,
  //     name: {
  //       first: "Kushal",
  //       last: "Shah"
  //     },
  //     job: {
  //       companyName: "Sprinklr",
  //       title: "Product Engineer"
  //     },
  //     email: {
  //       emailID: "kushal.shah@sprinklr.com",
  //     },
  //     phone: {
  //       number: "7043494349",
  //     }
  // };
  // updateIDB(test1)

    let contactList = [];
    fetchFromIDB()
    .then(res => {
      contactList = res.map(el => el.draft);
      console.log(contactList)
      const starredContactList = contactList.filter(contact => contact.isFavourite)

      this.setState({
          contactList: contactList,
          starredContactList: starredContactList,
      })
    })
  }
  
  componentWillUnmount() {
    closeIDB()
    .then(() => {
      console.log("Indexed DB successfully closed");
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  onAction = (actionType, updatedState) => {

    switch (actionType) {
      case UPDATE_CONTACT_LIST:
        const {updatedContactList} = updatedState
        const starredContactList = updatedContactList.filter(contact => contact.isFavourite)

        this.setState({
            contactList: updatedContactList,
            starredContactList: starredContactList
        })
        break;
      
      case HANDLE_MODAL_DISPLAY:
        const {showModal, formContactDraft, modalContent} = updatedState
        this.setState({
            showModal: showModal,
            formContactDraft: formContactDraft,
            modalContent: modalContent
        })
        break;

      default:
        console.log(`unknown action ${actionType} is found in onAction.`)
    }

  }


  render() {
    return (
      <>
        <table className="contact-table">
          <Header onAction = {this.onAction}/>

          { (this.state.starredContactList.length) ? 
            <ContactBody  isStarredContacts
                          contactList={this.state.contactList}
                          onAction = {this.onAction}
            />
            :null
          }

          <ContactBody  isStarredContacts={false} 
                        contactList={this.state.contactList}
                        onAction = {this.onAction}
          />
        </table>

          <Modal  show={this.state.showModal}
                  contactList = {this.state.contactList}
                  contactDraft = {this.state.formContactDraft}
                  onAction = {this.onAction}
          >
            {this.state.modalContent}
          </Modal>
      </>
    )
  }
}

export default Table
