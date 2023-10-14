import React, { useState } from "react";
import styles from "./SendMessage.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

export default function SendMessage() {
  let x = useParams();
  console.log(x);

  async function addMessage(values) {
    let data = { ...values, receivedId: x.userId };
    let res = await axios.post(
      "https://sara7aiti.onrender.com/api/v1/message",
      data
    );
    console.log(res);
  }

  let formik = useFormik({
    initialValues: {
      messageContent: "",
    },
    onSubmit: (values) => {
      addMessage(values);
    },
  });

  return (
    <div className="container text-center py-5 my-5 text-center">
      <div className="card py-5 mb-5">
        <a data-toggle="modal" data-target="#profile">
          <img
            src="https://www.svgrepo.com/show/527757/incognito.svg"
            className="avatar"
            width={150}
          />
        </a>
        <h3 className="py-2">XX---UserName---XXX</h3>
        <div className="container w-50 m-auto">
          <form onSubmit={formik.handleSubmit}>
            <textarea
              name="messageContent"
              value={formik.values.messageContent}
              onChange={formik.handleChange}
              className="form-control"
              cols={10}
              rows={9}
              placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)"
            />
            <button type="submit" className="btn btn-outline-info mt-3">
              <i className="far fa-paper-plane" /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
