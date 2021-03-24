import React, { useState } from "react";
import { Modal, Button } from "react-bulma-components";
import "./helpModal.css";

function HelpModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="help-modal">
      <Modal show={modalIsOpen} onClose={() => setModalIsOpen(false)} closeOnBlur closeOnEsc>
        <p>
            Private<br></br>
            Public<br></br>
            Unlisted<br></br>
        </p>
      </Modal>
    </div>
  );
}

export default HelpModal;
