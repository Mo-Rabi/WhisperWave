import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
// Import the necessary icon
import { faFacebook } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top fixed-bottom">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-decoration-none lh-1">
            <svg className="bi" width={30} height={24}>
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2023 Whisper Wave, Inc
          </span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
