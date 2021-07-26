import React ,{useState,useEffect} from 'react'
import Header from './Header'
import SecondHeader from './SecondHeader';
import Record from './Record'
import "./App.css"
import  Alert from '@material-ui/lab/Alert';
import {auth,db} from './firebase'
import Snackbar from '@material-ui/core/Snackbar';
import Footer from './Footer'
function App() {
const [searchedResult, setSearchedResult] =useState("")
const [user,setUser]=useState(null);
const [mockData,setMockDate]=useState([])
const [popupMessage,setpopupMessage]=useState("");
const [messageType,setMessageType]=useState("");
const [ispopOpen,setIsPopOpen]=useState(false)


const showPopupMessage =(message,messageType,popupStatus)=>{
  setpopupMessage(message);
  setMessageType(messageType)
  setIsPopOpen(popupStatus)

  setTimeout(() => {
    setpopupMessage("")
    setMessageType("")
    setIsPopOpen(false)
  }, 5000);


}


useEffect(() => {

 const unSubscribe= auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      setUser(authUser)
    }else{
      setUser(null)
    }

  })
  
  return()=>{
    unSubscribe();
  }
  

}, [user])

 useEffect(() => {
  
  db.collection("credentials").orderBy("timestamp",'desc').onSnapshot((snapshot)=>{
     
    setMockDate(snapshot.docs.map(data=>({

        id:data.id,
        cred:data.data()

    })

    ))

  })


   return () => {
     
   }
 }, [])
 
  const getId=(id,indexPosition)=>{

    let record_id = id;
    let record_userId=   record_id.split("_")[indexPosition]
    return record_userId;

  }

  const updateSearchedResult =(value)=>{
    let myvalue = value.toLowerCase();
  
    setSearchedResult(myvalue)

  }
  let dataArray2 =mockData.filter((data)=>{
      return  getId(data.id,0) ===user?.uid;
  })
  let dataArray =dataArray2.filter((data)=>{
     return  data.cred.siteName.toLowerCase().indexOf(searchedResult) !==-1
  })
  return (
    

    <div className="App">

      
  
     <Header user={user} showPopupMessage={showPopupMessage}/>
     {user ?  <SecondHeader  showPopupMessage={showPopupMessage} updateSearchedResult={updateSearchedResult} user={user}/>:""}
   
      <div className="message">
      <Snackbar
     anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
      open={ispopOpen}
    >
      <Alert  severity={messageType}>
        {popupMessage}
    </Alert>
    </Snackbar>


      </div>
     
     <div className="recordContainer">
       {user?
      dataArray.length ? dataArray.map(({id,cred})=>(
    
      <Record  showPopupMessage={showPopupMessage} user={user} key={getId(id,1)} id={id} siteName={cred.siteName} username={cred.userName} password={cred.password}/>
    )):<Alert severity="info">No  Site Found , Create New !</Alert> :<Alert severity="info">Please Login !</Alert>}
    

     </div>
  
     <div className="footer">
       <Footer/>
     </div>

    </div>
  );
}

export default App;
