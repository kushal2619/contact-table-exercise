import React, { Component } from 'react'

import {updateIDB, deleteInIDB} from "./services/IndexedDBServices.js"
import CreateContactForm from "./CreateContactForm.js";
import "./style/ContactBodyStyle.css";
import starSVG from "./img/star.svg";
import blueStarSVG from "./img/blueStar.png";
import editSVG from "./img/edit.svg"; 
import binSVG from "./img/bin.svg";
import { UPDATE_CONTACT_LIST, HANDLE_MODAL_DISPLAY } from "./data/constants.js";

class ContactBody extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentRowID: null,
    }
  }
  
  handleStar = (event) => {
    const id = event.target.dataset.name.split("-")[1];
    let updatedContact = {};

    const updatedContactList = this.props.contactList.map(contact => {
      if(contact.uid === id) {
        updatedContact = {...contact, isFavourite: !contact.isFavourite}
        return updatedContact
      } else {
        return contact
      }
    })

    const updatedState = {
      updatedContactList: updatedContactList,
    }
    this.props.onAction(UPDATE_CONTACT_LIST, updatedState);
    updateIDB(updatedContact)
    .then(() => {
      console.log(`successfully updated`);
    })
    .catch(err => {
        console.log(err.message);
    })
  }

  handleEdit = (event) => {
    const id = event.target.dataset.name.split("-")[1];
    const draft = this.props.contactList.filter(contact => contact.uid === id)[0];

    const updatedState = {
      showModal: true,
      formContactDraft: draft,
      modalContent: CreateContactForm
    }
    this.props.onAction(HANDLE_MODAL_DISPLAY, updatedState);
  }

  handleBin = (event) => {
    const id = event.target.dataset.name.split("-")[1]
    const updatedContactList = this.props.contactList.filter(contact => contact.uid !== id);

    const updatedState = {
      updatedContactList: updatedContactList,
    }
    this.props.onAction(UPDATE_CONTACT_LIST, updatedState);
    deleteInIDB(id)
    .then((res) => {
      console.log(res);
    })
    .catch(err => {
        console.log(err.message);
    })
  }

  handleEnterRow = (event) => {
    this.setState({
      currentRowID: event.target.closest(".table-row").id.split("-")[1],
    })
  }

  handleLeaveRow = () => {
    this.setState({
      currentRowID: null,
    })
  }

  render() {
    return (
      <tbody>
          <tr>
            <td className="contact-type">
              {(this.props.isStarredContacts? "Starred Contact": "Contact")} ({this.props.contactList.length})
            </td>
          </tr>
          
          {this.props.contactList.map(contact => {
            if(!this.props.isStarredContacts || contact.isFavourite) {
              return (
                <tr className="table-row" 
                    key={contact.uid} 
                    id={`row-${contact.uid}`}
                    onMouseEnter={this.handleEnterRow}
                    onMouseLeave={this.handleLeaveRow}
                >
                  <td className="name-cell">
                      <div className="name-cell-img">
                          {
                            contact.name.first[0] ||
                            contact.name.last[0] ||
                            contact.job.companyName[0] ||
                            contact.phone.number[0] ||
                            contact.email.emailID[0] ||
                            contact.job.title[0] || "?"
                          }
                      </div>
                      <div>
                          {`${contact.name.first} ${contact.name.last}`}
                      </div>
                  </td>

                  <td className="email-cell"> 
                    {contact.email.emailID} 
                  </td>

                  <td className="phone-cell"> 
                    {contact.phone.number} 
                  </td>

                  <td className="job-cell">
                    {
                      (contact.job.companyName && contact.job.title) ? `${contact.job.title},${contact.job.companyName}`
                                                                      : `${contact.job.title}${contact.job.companyName}`
                    }
                  </td>

                  <td className="option-cell">
                    <img  src = {(contact.isFavourite) ? blueStarSVG : starSVG} 
                          alt = "starred"
                          className = { (contact.uid === this.state.currentRowID)? "star-img"
                                          :"star-img option-cell-visibility-hidden" 
                                      }
                          data-name = {`star-${contact.uid}`}
                          onClick = {this.handleStar}
                    />
                    <img  src = {editSVG} 
                          alt = "" 
                          className = { (contact.uid === this.state.currentRowID)? "edit-img"
                                          :"edit-img option-cell-visibility-hidden"
                                      }
                          data-name = {`edit-${contact.uid}`}
                          onClick = {this.handleEdit}
                    />
                    <img  src = {binSVG}
                          alt = "delete"
                          className = { (contact.uid === this.state.currentRowID)? "bin-img"
                                          :"bin-img option-cell-visibility-hidden"
                                      }
                          data-name = {`bin-${contact.uid}`}
                          onClick = {this.handleBin}
                    />
                  </td>
                </tr>
              )
            }
            return null
          })}
      </tbody>
    )
  }
}

export default ContactBody
