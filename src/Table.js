import React, { Component } from 'react'

import Header from "./Header.js";
import ContactBody from "./ContactBody.js";
import Modal from "./Modal.js"
//import CreateContactForm from "./CreateContactForm.js";
import "./style/TableStyle.css";
import ContactListInstance from './data/database.js';
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
    //console.log("contact list updated");
    this.setState({
        contactList: ContactListInstance.contactList,
    })

    const starredContactList = ContactListInstance.contactList.filter(contact => contact.isFavourite)
    this.setState({
      starredContactList: starredContactList
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
