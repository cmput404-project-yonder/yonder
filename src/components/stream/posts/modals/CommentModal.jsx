import React, { useState } from "react";
import { Modal } from "react-bulma-components";

import PostForm from "../PostForm";

import AddButton from "../buttons/NewPostFloatingButton";

function CommentModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="post-form-modal">
      <AddButton isFlat={true} action={() => setModalIsOpen(true)}/>
      <Modal className="animate__animated animate__fadeIn animate__faster" show={modalIsOpen} onClose={() => setModalIsOpen(false)} closeOnBlur closeOnEsc>
        <PostForm setModalIsOpen={setModalIsOpen} createPost={props.createPost} />
      </Modal>
    </div>
  );
}

export default CommentModal;
