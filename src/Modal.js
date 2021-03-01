import React, { Component } from 'react'
import "./style/ModalStyle.css";

export class Modal extends Component {

  handleDisplay = (event) => {
    if(event.target.dataset.name === "modal-background") {
      this.props.handleModalDisplay(false, null);
    }
  }

  render() {
    return (
      <div  className="modal-background" 
            style={{
                display: (!this.props.show)? 'none': "",
            }}
            onClick = {this.handleDisplay}
            data-name = "modal-background"
      >
        <div className="modal-center">
          {(this.props.children)? <this.props.children  contactObj = {this.props.contactObj}
                                  contactList = {this.props.contactList}
                                  updateContactList={this.props.updateContactList}
                                  handleModalDisplay={this.props.handleModalDisplay}
                                  />
                                : null
          }
        </div>
      </div>
    )
  }
}

export default Modal
