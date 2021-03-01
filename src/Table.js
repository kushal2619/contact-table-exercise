import React, { Component } from 'react'

import Header from "./Header.js";
import ContactBody from "./ContactBody.js";
import Modal from "./Modal.js"
//import CreateContactForm from "./CreateContactForm.js";
import "./style/TableStyle.css";
import ContactListInstance from './data/database.js';

export class Table extends Component {

    constructor() {
        super();
        this.state = {
            contactList: [],
            showModal: false,
            formContactObj: null,
            modalContent: null,
        }
    }

    componentDidMount() {
        //console.log("contact list updated");
        this.setState({
            contactList: ContactListInstance.contactList,
        })
    }

    updateContactList = (updatedList) => {
        this.setState({
            contactList: updatedList
        })
    }

    updateModalContent = (modalContent) => {
        this.setState({
            modalContent: modalContent
        })
    }

    handleModalDisplay = (showModal, formContactObj) => {
        this.setState({
            showModal: showModal,
            formContactObj: formContactObj,
        })
    }

    render() {

        const starredContactList = this.state.contactList.filter(contact => contact.starContact);

        return (
            <>
                <table className="contact-table">
                    <Header handleModalDisplay = {this.handleModalDisplay}
                            updateModalContent = {this.updateModalContent}
                    />
                    {
                        (starredContactList.length)? <ContactBody   isStarredContacts={true} 
                                                                    contactList={this.state.contactList}
                                                                    updateModalContent={this.updateModalContent}
                                                                    updateContactList={this.updateContactList}
                                                                    handleModalDisplay={this.handleModalDisplay}
                                                    />
                                                    :null
                    }
                    <ContactBody    isStarredContacts={false} 
                                    contactList={this.state.contactList}
                                    updateModalContent={this.updateModalContent}
                                    updateContactList={this.updateContactList}
                                    handleModalDisplay={this.handleModalDisplay}
                    />
                </table>

                <Modal  show={this.state.showModal}
                        handleModalDisplay={this.handleModalDisplay}
                        contactList = {this.state.contactList}
                        contactObj = {this.state.formContactObj}
                        updateContactList={this.updateContactList}
                        children = {this.state.modalContent}
                />
            </>
        )
    }
}

export default Table
