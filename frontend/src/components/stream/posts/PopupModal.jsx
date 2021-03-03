import React, { useState } from "react";
import { Modal, Button } from "react-bulma-components";

import PostForm from "./PostForm";
import './modal.css';

function PopupModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="post-form-modal">
      <Button color="primary" onClick={() => setModalIsOpen(true)}>
        Create a Post
      </Button>
      <Modal show={modalIsOpen} onClose={() => setModalIsOpen(false)} closeOnBlur closeOnEsc>
        <PostForm setModalIsOpen={setModalIsOpen} createPost={props.createPost} />
      </Modal>
    </div>
  );
}

export default PopupModal;
