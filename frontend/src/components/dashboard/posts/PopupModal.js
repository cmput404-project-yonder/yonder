import React, { Component, useState } from "react";
import Modal from "react-modal";
import PostForm from "./PostForm"

Modal.setAppElement('#root')

function PopupModal(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    return (
        <div>
            <button className="btn btn-success" onClick={() => setModalIsOpen(true)}>Create a Post</button>
            <Modal isOpen={modalIsOpen} style={{ width:`100px`, height:`100px` }} >
                <h2 style={{ display:'flex', justifyContent:'center', alignItems:'center' }} >Create a Post</h2>
                <PostForm/>
                <div>
                    <button onClick={() => {{ if (window.confirm('Are you sure you wish to delete this post?')) setModalIsOpen(false) } }}>Cancel</button>
                </div>
            </Modal>
        </div>
    )
}

export default PopupModal