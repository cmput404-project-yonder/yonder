import React, { useState } from "react";
import { Modal } from "react-bulma-components";
import { connect } from "react-redux";
import CommentForm from "../CommentForm";
import AddButton from "../buttons/NewPostFloatingButton";
import { createComment } from "../PostActions";



function CommentModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const afterCommentSent = () => {
    // comfirm the comment is sent and close the modal
    // also calls the chained function from its parent
    if (props.afterDone !== undefined) {
      props.afterDone();   // parent
    }
    setModalIsOpen(false);      // only close if comment is confirmed by the backend
  }

  return (
    <div className="post-form-modal">
      <AddButton isFlat={true} action={() => setModalIsOpen(true)}/>
      <Modal className="animate__animated animate__fadeIn animate__faster" show={modalIsOpen} onClose={() => setModalIsOpen(false)} closeOnBlur closeOnEsc>
        <CommentForm sendComment={(content) => props.createComment(content, post, () => afterCommentSent())} />
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
  createComment, 
})(CommentModal);
