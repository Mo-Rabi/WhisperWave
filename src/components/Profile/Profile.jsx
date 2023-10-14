import React, { useContext } from "react";
import styles from "./Profile.module.css";
//import { CounterContext } from "../../Context/Counter";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TokenContext } from "../../Context/TokenContext";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { increase } from "../../Redux/counterSlice";
import { increaseByAmount } from "../../Redux/counterSlice";
import { useSelector } from "react-redux";

export default function Profile() {
  const { counter } = useSelector((state) => state.counterRed);
  console.log("Counter from profile: " + counter);

  let dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  /* TODO 
  [] Make getMessages function using React Query + axios https://tanstack.com/query/v3/docs/react/overview
  */
  async function getMessages() {
    let token = localStorage.getItem("userToken");
    console.log(token);
    try {
      let { data } = await axios.get(
        "https://sara7aiti.onrender.com/api/v1/message",
        {
          headers: {
            token,
          },
        }
      );
      console.log("Data from profile" + data);
      setAllMessages(data.allMessages);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  }

  function getUserId() {
    let decoded = jwtDecode(localStorage.getItem("userToken"));
    console.log(decoded.id, decoded.name);
    setUserId(decoded.id);
  }

  useEffect(() => {
    getMessages();
    getUserId();

    return () => {};
  }, []);

  // let { counter, setCounter } = useContext(CounterContext);

  // function updateCounter() {
  //   setCounter(counter + 1);
  // }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCopyToClipboard = async () => {
    const linkToCopy = `${window.location.origin}/message/${userId}`;

    try {
      await navigator.clipboard.writeText(linkToCopy);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link to clipboard", error);
    }
  };

  return (
    <>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card pt-5">
          <a data-toggle="modal" data-target="#profile">
            <img
              src="https://www.svgrepo.com/show/527757/incognito.svg"
              width={200}
              className="avatar "
            />
          </a>
          <h3 className="py-2">XXX--- Usename ---XXX</h3>
          <Button
            variant="outline-dark"
            className="mx-auto mb-3 rounded-pill"
            onClick={handleShow}
          >
            <i className="fas fa-share-alt" /> Share Profile
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Share profile with friends</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Link
                className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                to={window.location.origin + "/message/" + userId}
                onClick={handleCopyToClipboard}
              >
                {" "}
                Copy link <i class="fa-solid fa-copy"></i>
              </Link>
              <span className="ms-5">
                <i className="ms-5 fa-brands fa-facebook"></i>
                <i className="ms-1 fa-brands fa-twitter"></i>
                <i className="ms-1 fa-brands fa-instagram"></i>
              </span>
            </Modal.Body>
          </Modal>
        </div>
      </div>

      <div className="container text-center my-5 text-center">
        <div className="row">
          {allMessages.length == 0 ? (
            <div className="col-md-12">
              <div className="card py-5">
                <p>You don't have any messages... </p>
              </div>
            </div>
          ) : (
            ""
          )}

          {allMessages.map((ele) => (
            <div key={ele.id} className="col-md-12 mb-3">
              <div className="card py-5">
                <p>{ele.messageContent}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => dispatch(increaseByAmount(20))}>
          {" "}
          Increase
        </button>
        {counter}
      </div>
    </>
  );
}
