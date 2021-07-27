import React, { useState } from "react";
import "./Record.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Container, Button } from "@material-ui/core";
import { db } from "./firebase";
import firebase from "firebase";
const Record = ({ showPopupMessage, id, siteName, username, password }) => {
  const [display, setDisplay] = useState("none");
  const [popupState, setPopupState] = useState(false);
  const [inputSiteName, setSiteName] = useState("");
  const [inputUserName, setUsername] = useState("");
  const [inputPassword, setPassword] = useState("");
  //showing message after clicking on img
  const openUserNameTooltip = () => {
    showPopupMessage("Copied successfylly !", "success", true);
  };
  const openUpdatePopup = () => {
    setPopupState(true);
    setSiteName(siteName);
    setUsername(username);
    setPassword(password);
  };
  const updateRecord = (record_id) => {
    db.collection("credentials")
      .doc(record_id)
      .set({
        siteName: inputSiteName,
        userName: inputUserName,
        password: inputPassword,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setPopupState(false);
        showPopupMessage("Site updated !", "success", true);
      })
      .catch((err) => {
        showPopupMessage(err.message, "error", true);
      });
  };
  const closeUpdatePopup = () => {
    setPopupState(false);
  };
  const deleteRecord = (enterId) => {
    db.collection("credentials")
      .doc(enterId)
      .delete()
      .then(() => {
        showPopupMessage("Site Deleted !", "success", true);
      })
      .catch((err) => {
        showPopupMessage(err.message, "error", true);
      });
  };

  return (
    <>
      <div className='record'>
        <span className='site_name'>{siteName}</span>
        <div className='usercontainer'>
          <CopyToClipboard text={username}>
            <span>
              <img
                onClick={openUserNameTooltip}
                className='copy_image'
                src='data:image/jpeg;base64,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'
                alt=''
              />
            </span>
          </CopyToClipboard>
          <span title={"userName --> " + username} className='username'>
            {username}
          </span>
        </div>

        <div className='passContainer'>
          <CopyToClipboard text={password}>
            <span>
              <img
                onClick={openUserNameTooltip}
                className='copy_image'
                src='data:image/jpeg;base64,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'
                alt=''
              />
            </span>
          </CopyToClipboard>
          <VisibilityIcon
            onClick={() => (
              setDisplay("block"),
              setTimeout(() => {
                setDisplay("none");
              }, 5000)
            )}
          />
          <span
            style={{ display: display }}
            title={"password --> " + password}
            className='password'
          >
            {password}
          </span>
        </div>

        <div className='record_botton_container'>
          <Button variant='contained' color='primary' onClick={openUpdatePopup}>
            Edit
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              deleteRecord(id);
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Update Record */}

      <div className='updateRecord'>
        <Dialog
          className='update_record'
          aria-labelledby='simple-dialog-title'
          open={popupState}
        >
          <DialogTitle id='simple-dialog-title'>Update Record</DialogTitle>
          <DialogContent>
            <div className='update_record_container'>
              <Container>
                <div className='update_record_site_name'>
                  <label htmlFor=''>SiteName</label>
                  <input
                    value={inputSiteName}
                    onChange={(e) => {
                      setSiteName(e.target.value);
                    }}
                    type='text'
                  />
                </div>
                <div className='update_record_username'>
                  <label htmlFor=''>Username</label>
                  <input
                    value={inputUserName}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type='text'
                  />
                </div>
                <div className='update_record_password'>
                  <label htmlFor=''>Password</label>
                  <input
                    value={inputPassword}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type='password'
                  />
                </div>

                <div className='updateButtonConatain'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => updateRecord(id)}
                  >
                    Update Record
                  </Button>
                  <Button
                    variant='contained'
                    color='default'
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </Button>
                </div>
              </Container>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Record;
