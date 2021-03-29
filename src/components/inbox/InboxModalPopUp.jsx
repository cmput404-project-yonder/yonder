import React, { useState } from "react";
import { Modal } from "react-bulma-components";

import InboxButton from "./InboxFloatingButton";
import InboxModal from "./InboxModal";


function PopupModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="post-form-modal">
      <InboxButton action={() => setModalIsOpen(true)}/>
      <Modal className="animate__animated animate__fadeIn animate__faster" show={modalIsOpen} onClose={() => setModalIsOpen(false)} closeOnBlur closeOnEsc>
        <InboxModal setModalIsOpen={setModalIsOpen}/>
      </Modal>
    </div>
  );
}

export default PopupModal;