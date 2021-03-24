import React, { useState } from "react";
import { Modal, Button } from "react-bulma-components";

import PostForm from "./PostForm";
import "./modal.css";

import AddButton from "./NewPostFloatingButton";

var buttonStyle = {
  height: "4em",
  width: "4em",
  borderRadius: "100%",
  boxShadow: "0pt 0pt 8pt #CCCCCC",
  backgroundColor: "red"
}

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
