import React, { Component } from 'react'

import starSVG from "./img/star.svg";
import blueStarSVG from "./img/blueStar.png";
import editSVG from "./img/edit.svg"; 
import binSVG from "./img/bin.svg";
import ContactListInstance from "./data/database.js";

export class OptionCell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      contact: this.props.contact,
    }
  }

  handleOnClickStar = (id, contact) => {
    ContactListInstance.updateObject(id, {...contact, starContact: true})
    console.log(ContactListInstance.contactList)
  }

  handleOnClickEdit = () => {

  }

  handleOnClickBin = () => {

  }

  render() {
    
    return (
      <td className="option-cell">
        <img  src={(this.state.contact.starContact) ? blueStarSVG : starSVG} 
              alt="starred"
              className="star-img"
              onClick={() => this.handleOnClickStar(this.state.id, this.state.contact)}
        />
        <img  src={editSVG} 
              alt="" 
              className="edit-img"
              onClick={this.handleOnClickEdit}
        />
        <img  src={binSVG}
              alt="delete"
              className="bin-img"
              onClick={() => this.handleOnClickBin(this.state.id, this.state.contact)}
        />
      </td>
    )
  }
}

export default OptionCell
