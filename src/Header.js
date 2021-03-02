import React, { Component } from 'react'

import CreateContactForm from "./CreateContactForm.js";
import "./style/HeaderStyle.css";
import addSVG from "./img/add.svg";
import {HANDLE_MODAL_DISPLAY} from "./data/constants.js"

export class Header extends Component {

    handleAddContactbutton = () => {
        const draft = {
            isFavourite: false,
            name: {
              first: "",
              last: ""
            },
            job: {
              companyName: "",
              title: ""
            },
            email: {
              emailID: "",
            },
            phone: {
              number: "",
            }
        };
        const updatedState = {
          showModal: true,
          formContactDraft: draft,
          modalContent: CreateContactForm
        }
        this.props.onAction(HANDLE_MODAL_DISPLAY, updatedState);
    }

    render() {
        return (
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Job title & company</th>
                    <th>
                        <img src={addSVG} 
                                alt="Add Contact" 
                                className="add-button"
                                onClick={this.handleAddContactbutton}
                        />
                    </th>
                </tr>
            </thead>
        )
    }
}

export default Header
