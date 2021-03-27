import React, { useState } from "react";
import { Modal, Button } from "react-bulma-components";

import PostForm from "./PostForm";

import AddButton from "./NewPostFloatingButton";

function PopupModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="post-form-modal">
      <AddButton action={() => setModalIsOpen(true)}/>
      <Modal show={modalIsOpen} onClose={() => setModalIsOpen(false)} closeOnBlur closeOnEsc>
        <PostForm setModalIsOpen={setModalIsOpen} createPost={props.createPost} />
      </Modal>
    </div>
  );
}

export default PopupModal;
