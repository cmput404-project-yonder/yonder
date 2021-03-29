import React, { useState } from "react";
import { Modal } from "react-bulma-components";

import PostForm from "../stream/posts/PostForm";

import InboxButton from "./InboxFloatingButton";
import InboxModal from "./InboxModal";


function PopupModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="post-form-modal">
      <InboxButton action={() => setModalIsOpen(true)}/>
      <Modal show={modalIsOpen} onClose={() => setModalIsOpen(false)} closeOnBlur closeOnEsc>
        <InboxModal setModalIsOpen={setModalIsOpen}/>
      </Modal>
    </div>
  );
}

export default PopupModal;