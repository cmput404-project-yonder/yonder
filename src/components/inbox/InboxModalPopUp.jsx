import React, { useState } from "react";
import { Modal } from "react-bulma-components";

import PostForm from "../stream/posts/PostForm";

import AddButton from "../stream/posts/NewPostFloatingButton";

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