import React, { Component } from 'react'
import "./style/ModalStyle.css";
import {HANDLE_MODAL_DISPLAY} from "./data/constants.js"

export class Modal extends Component {

  handleDisplay = (event) => {
    if(event.target.dataset.name === "modal-background") {
      this.props.onAction(
        HANDLE_MODAL_DISPLAY, 
        {   showModal: false,
            formContactDraft: null,
            modalContent: null
        })
    }
  }

  render() {
    //console.log(this.props.children)
    return (
      <div  className="modal-background" 
            style={{
                display: (!this.props.show)? 'none': "",
            }}
            onClick = {this.handleDisplay}
            data-name = "modal-background"
      >
        <div className="modal-center">
          {(this.props.children) ? 
            <this.props.children  contactDraft = {this.props.contactDraft}
                                  contactList = {this.props.contactList}
                                  onAction = {this.props.onAction}
                                  />
            : null
          }
        </div>
      </div>
    )
  }
}

export default Modal
