import React, { Component } from 'react'

import CreateContactForm from "./CreateContactForm.js";
import "./style/HeaderStyle.css";
import addSVG from "./img/add.svg";

export class Header extends Component {

    handleOnClickAddContactbutton = () => {
        const obj = {
            starContact: false,
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
        this.props.updateModalContent(CreateContactForm);
        this.props.handleModalDisplay(true,obj);
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
                                onClick={this.handleOnClickAddContactbutton}
                        />
                    </th>
                </tr>
            </thead>
        )
    }
}

export default Header
