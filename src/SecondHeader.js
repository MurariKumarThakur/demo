import React,{useState} from 'react'
import './SecondHeader.css'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Container,Button} from "@material-ui/core"
import { db } from './firebase';
import firebase from 'firebase';
import  Alert from '@material-ui/lab/Alert';
const SecondHeader = ({ showPopupMessage,updateSearchedResult,user}) => {
    const [searchInput,setSearchedInput]=useState("")
    const [addNewPopupOpen,setAddNewPopup]=useState(false)
    const [siteName,setSiteName]=useState("")
    const [userName,setUserName]=useState("")
    const [password,setPassword]=useState("")
    const handleChange=(e)=>{
      
       setSearchedInput(e.target.value)
       updateSearchedResult(e.target.value)
    } 
    const openAddNewRecordPopup=()=>{
        setAddNewPopup(true)
    }
    const closeAddNewRecordPopup=()=>{
        setAddNewPopup(false)
    }
   const clearInput=()=>{
    setSiteName("")
    setUserName("")
    setPassword("")
    }
  
    /*
      insert data in db
    */
     const insertDataInDb=()=>{
       
        if(siteName =="" || userName==""){
            showPopupMessage("SiteName & UserName are  required field !","error",true)
            return;
        }


         db.collection('credentials').doc(user?.uid+"_"+ new Date().getTime()).set({
            
             siteName:siteName,
             userName:userName,
             password:password,
             timestamp:firebase.firestore.FieldValue.serverTimestamp()
         }).then(()=>{
            setAddNewPopup(false)
              clearInput()
              showPopupMessage("Site created !","success",true)
         }).catch((err)=>{
            showPopupMessage(err.message,"error",true) 
         })

        
     }
    return (
        <>
         
        <div className='sec_header'>
            <div className="searchbox">
             <label >Search : </label>   
            <input value={searchInput} type="text" placeholder="Search By  Site Name"  onChange={handleChange} />
             {searchInput? <Button variant="contained" color="default" onClick={()=>(setSearchedInput(""), updateSearchedResult(""))}>Clear</Button>:""}
            </div>
            
             
             <Button variant="contained" color="default" onClick={openAddNewRecordPopup}> Add New Record </Button> 

        </div>
            <div className="addnewRecod">
            
               {/* Add new record */}
         <div className="addNewrecord">
              <Dialog className="add_new_record"  aria-labelledby="simple-dialog-title" open={addNewPopupOpen}>
              <DialogTitle id="simple-dialog-title">Add New Record</DialogTitle>
              <DialogContent>
               <div className="add_new_record_container">
                  <Container >
                  <div className="add_new_record_site_name">
                  <label htmlFor="">SiteName</label>
                  <input onChange={(e)=>{setSiteName(e.target.value)}} type="text" />
                  </div>
                  <div className="add_new_record_username">
                  <label htmlFor="">Username</label>
                  <input onChange={(e)=>{setUserName(e.target.value)}} type="text" />
                  </div>
                  <div className="add_new_record_password">
                  <label htmlFor="">Password</label>
                  <input onChange={(e)=>{setPassword(e.target.value)}} type="password" />
                  </div>
                
                  <div className="buttonContainer">
                  
                    <Button variant="contained" color="primary" onClick={insertDataInDb}>Add Record</Button>
                    <Button variant="contained" color="default" onClick={closeAddNewRecordPopup}>Cancel</Button>

                 </div>
                </Container>
               
              </div>

            </DialogContent>
             </Dialog>
              </div>

            </div>
        </>
    )
}

export default SecondHeader
