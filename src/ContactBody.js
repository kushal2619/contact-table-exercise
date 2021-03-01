import React, { Component } from 'react'

import ContactListInstance from './data/database.js';
import CreateContactForm from "./CreateContactForm.js";
//import OptionCell from './OptionCell';
import "./style/ContactBodyStyle.css";
import starSVG from "./img/star.svg";
import blueStarSVG from "./img/blueStar.png";
import editSVG from "./img/edit.svg"; 
import binSVG from "./img/bin.svg";

export class ContactBody extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentRowID: null,
    }
  }
  
  handleOnClickStar = (event) => {
    const id = event.target.dataset.name.split("-")[1];

    const updatedContanctList = this.props.contactList.map(contact => {
      if(contact.uid === id) {
        return {...contact, starContact: !contact.starContact}
      } else {
        return contact
      }
    })
    this.props.updateContactList(updatedContanctList);
    ContactListInstance.set(updatedContanctList);
  }

  handleOnClickEdit = (event) => {
    const id = event.target.dataset.name.split("-")[1];
    const obj = this.props.contactList.filter(contact => contact.uid === id)[0];
    this.props.updateModalContent(CreateContactForm);
    this.props.handleModalDisplay(true, obj);
  }

  handleOnClickBin = (event) => {
    const id = event.target.dataset.name.split("-")[1];

    const updatedContanctList = this.props.contactList.filter(contact => contact.uid !== id);
    this.props.updateContactList(updatedContanctList);
    ContactListInstance.set(updatedContanctList);
  }

  handleOnMouseEnterRow = (event) => {
    this.setState({
      currentRowID: event.target.closest(".table-row").id.split("-")[1],
    })
  }

  handleOnMouseLeaveRow = () => {
    this.setState({
      currentRowID: null,
    })
  }

  render() {

    let contactList = this.props.contactList;

    if(this.props.isStarredContacts) {
      contactList = contactList.filter(contact => contact.starContact);
    } 

    return (
      <tbody>
          <tr>
            <td className="contact-type">
              {(this.props.isStarredContacts? "Starred Contact": "Contact")} ({contactList.length})
            </td>
          </tr>
          
          {contactList.map(contact => {
            return (
              <tr className="table-row" 
                  key={contact.uid} 
                  id={`row-${contact.uid}`}
                  onMouseEnter={this.handleOnMouseEnterRow}
                  onMouseLeave={this.handleOnMouseLeaveRow}
              >
                <td className="name-cell">
                    <div className="name-cell-img">
                        {
                            contact.name.first? contact.name.first[0]
                            : contact.name.last? contact.name.last[0]
                            : contact.job.companyName? contact.job.companyName[0]
                            : contact.phone.number? contact.phone.number[0]
                            : contact.email.emailID? contact.email.emailID[0] 
                            : contact.job.title? contact.job.title[0]: "?"
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
                  <img  src = {(contact.starContact) ? blueStarSVG : starSVG} 
                        alt = "starred"
                        className = { (contact.uid === this.state.currentRowID)? "star-img"
                                        :"star-img option-cell-visibility-hidden" 
                                    }
                        data-name = {`star-${contact.uid}`}
                        onClick = {this.handleOnClickStar}
                  />
                  <img  src = {editSVG} 
                        alt = "" 
                        className = { (contact.uid === this.state.currentRowID)? "edit-img"
                                        :"edit-img option-cell-visibility-hidden"
                                    }
                        data-name = {`edit-${contact.uid}`}
                        onClick = {this.handleOnClickEdit}
                  />
                  <img  src = {binSVG}
                        alt = "delete"
                        className = { (contact.uid === this.state.currentRowID)? "bin-img"
                                        :"bin-img option-cell-visibility-hidden"
                                    }
                        data-name = {`bin-${contact.uid}`}
                        onClick = {this.handleOnClickBin}
                  />
                </td>
              </tr>
            )
          })}
      </tbody>
    )
  }
}

export default ContactBody
