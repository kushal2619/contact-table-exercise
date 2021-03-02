import React, { Component } from 'react'
import "./style/CreateContactFormStyle.css"

import {updateIDB} from "./services/IndexedDBServices.js"
//import ContactListInstance from "./data/database.js";
import personSVG from "./img/person.svg";
import officeSVG from "./img/office.svg";
import mailSVG from "./img/mail.svg";
import phoneSVG from "./img/phone.svg";
import { UPDATE_CONTACT_LIST, HANDLE_MODAL_DISPLAY } from "./data/constants.js";

export class CreateContactForm extends Component {

    constructor(props) {
        super(props);
        //console.log("constructor")
        this.state = {
            firstName: this.props.contactDraft.name.first,
            lastName: this.props.contactDraft.name.last,
            companyName: this.props.contactDraft.job.companyName,
            jobTitle: this.props.contactDraft.job.title,
            emailID: this.props.contactDraft.email.emailID,
            phone: this.props.contactDraft.phone.number,
            prvProps: this.props,
        }
    }

    checkAllInputValues = () => {
        const {firstName, lastName, companyName, jobTitle, emailID, phone} = this.state;
        return (firstName || lastName || companyName || jobTitle || emailID || phone)
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [event.target.dataset.name]: event.target.value,
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        const id = (this.props.contactDraft.uid) || (Date.now().toString(36) + Math.random().toString(36).slice(2));
        const isFavourite = this.props.contactDraft.isFavourite

        const draft = {
            uid: id,
            isFavourite: isFavourite,
            name: {
                first: this.state.firstName,
                last: this.state.lastName,
            },
            job: {
                companyName: this.state.companyName,
                title: this.state.jobTitle,
            },
            email: {
                emailID: this.state.emailID,
            },
            phone: {
                number: this.state.phone,
            }
        }

        let updatedContactList = [];

        if(draft.uid === this.props.contactDraft.uid) {
            updatedContactList = this.props.contactList.map(contact => {
                if(contact.uid === draft.uid) {
                    return draft;
                } else {
                    return contact;
                }
            })
        } else {
            updatedContactList = [...this.props.contactList, draft];
        }

        let updatedState = {
            updatedContactList: updatedContactList,
        }
        this.props.onAction(UPDATE_CONTACT_LIST, updatedState);
        updateIDB(draft)
        .then(() => {
            console.log(`successfully updated`);
        })
        .catch(err => {
            console.log(err.message);
        })
        //ContactListInstance.set(updatedContactList);

        updatedState = {
            showModal: false,
            formContactDraft: null,
            modalContent: null
        }
        this.props.onAction(HANDLE_MODAL_DISPLAY, updatedState);
    }

    render() {
        
        return (
            <form className="create-contact-form" onSubmit={this.handleOnSubmit}>
                <div className="form-header">
                    <div className="header-text">Create New Contact</div>
                </div>

                <div className="form-body" >
                    <div className="input-row">
                        <img src={personSVG} alt="" className="input-field-img"/>

                        <div className="row-field">
                            <div className="row-field-header-text">
                                First name
                            </div>
                            <input type="text" 
                                    placeholder="First name" 
                                    className="row-field-input"
                                    value={this.state.firstName}
                                    onChange={this.handleOnChangeInput}
                                    data-name = "firstName"
                            />
                        </div>

                        <div className="row-field">
                            <div className="row-field-header-text">
                                Last name
                            </div>
                            <input type="text" 
                                    placeholder="Last name" 
                                    className="row-field-input"
                                    value={this.state.lastName}
                                    onChange={this.handleOnChangeInput}
                                    data-name = "lastName"
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <img src={officeSVG} alt="" className="input-field-img"/>

                        <div className="row-field">
                            <div className="row-field-header-text">
                                Company
                            </div>
                            <input type="text" 
                                    placeholder="Company" 
                                    className="row-field-input"
                                    value={this.state.companyName}
                                    onChange={this.handleOnChangeInput}
                                    data-name = "companyName"
                            />
                        </div>

                        <div className="row-field">
                            <div className="row-field-header-text">
                                Job title
                            </div>
                            <input type="text" 
                                    placeholder="Job title" 
                                    className="row-field-input"
                                    value={this.state.jobTitle}
                                    onChange={this.handleOnChangeInput}
                                    data-name = "jobTitle"
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <img src={mailSVG} alt="" className="input-field-img"/>

                        <div className="row-field">
                            <div className="row-field-header-text">
                                Email
                            </div>
                            <input type="text" 
                                    placeholder="Email" 
                                    className="row-field-input"
                                    value={this.state.emailID}
                                    onChange={this.handleOnChangeInput}
                                    data-name = "emailID"
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <img src={phoneSVG} alt="" className="input-field-img"/>

                        <div className="row-field">
                            <div className="row-field-header-text">
                                Phone
                            </div>
                            <input type="text" 
                                    placeholder="Phone" 
                                    className="row-field-input"
                                    value={this.state.phone}
                                    onChange={this.handleOnChangeInput}
                                    data-name = "phone"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-footer">
                    <div className="footer-button" 
                         onClick =  {() => this.props.onAction(
                                            HANDLE_MODAL_DISPLAY, 
                                            {   showModal: false,
                                                formContactDraft: null,
                                                modalContent: null
                                            })
                                    }
                    >
                        Cancel
                    </div>
                    <button className={(this.checkAllInputValues())?"footer-button":"footer-button disabled-save-button"}
                         id="create-contact-form-save-button"
                         type="submit"
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

export default CreateContactForm
