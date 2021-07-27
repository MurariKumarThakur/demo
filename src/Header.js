import React,{useState} from 'react'
import './Header.css'
import {auth} from './firebase'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Container,Button} from "@material-ui/core"
import  Alert from '@material-ui/lab/Alert';
const Header = ({showPopupMessage,user}) => {
    const [signInForm,setSignInForm]=useState(false)
    const [signUpForm,setSignUpForm]=useState(false)
    const [dname,setdname]=useState("")
    const [regUser,setRegUser]=useState("")
    const [regPass,setRegPass]=useState("")
    const [regConfirmPass,setRegconfirmPass]=useState("")
    const [loginEmail,setLoginEmail]=useState("")
    const [loginPass,setLoginPass]=useState("")

    const openSignInForm=()=>{
      clearLoginForm()
        setSignInForm(true)
    }
    const closeSignInForm=()=>{
        setSignInForm(false)
    }
     const openSignUpForm=()=>{
      clearSignUpForm();
        setSignUpForm(true)
    }
    const closeSignUpForm=()=>{
        setSignUpForm(false)
    }

    const clearSignUpForm=()=>{
        setdname("")
        setRegUser("")
        setRegPass("")
        setRegconfirmPass("")
    }
    const clearLoginForm=()=>{
        setLoginEmail("")
        setLoginPass("")
    }
    
    /*
     Register the user 
    */
    const RegisterUser=()=>{
        if(regPass !== regConfirmPass){
          showPopupMessage("Password & Confirm password should be same","error",true)
           return; 
        }
       
        auth.createUserWithEmailAndPassword(regUser,regPass).then((auser)=>{

          
            
           

            setSignUpForm(false)
            clearSignUpForm()
            auser.user.updateProfile({
                displayName:dname
            })

            showPopupMessage("Registration completed Successfully !","success",true)
        }).catch((e)=>{
          showPopupMessage(e.message,"error",true)
        })
    }

    /*
      Login user 
    */
      const LoginToTheApp=()=>{
          auth.signInWithEmailAndPassword(loginEmail,loginPass).then(()=>{

            setSignInForm(false)
            clearLoginForm();
            showPopupMessage("Logged in successfully !","success",true)
          }).catch((e)=>{
            showPopupMessage(e.message,"error",true)
          })
      }
      /*
       Signout
      */
       const signOut=()=>{
           auth.signOut();
           showPopupMessage("Logged out successfully !","success",true)
       }
    return (
        <> 
        <div className='header'>
         
          <div className='header_logo'>

              Password Manager
          </div>
           
            <div className="header_signIn">
                
                 Hello, {user?user.displayName?user.displayName: user.email  :"Guest"}

                { "  "}

              {user?<Button variant="contained" color="default" onClick={signOut}>Logout</Button>  :<Button variant="contained" color="default" onClick={openSignInForm} className="signIn">SignIn</Button>}
                {"  "}
                <Button variant="contained" color="default" onClick={openSignUpForm} className="signout">SignUp</Button>
            </div>
             
          
            
        </div>
         {/* Sign In Form */}
         <div className="signInForm">
              <Dialog className="login_popup"  aria-labelledby="simple-dialog-title" open={signInForm}>
              <DialogTitle id="simple-dialog-title">Login</DialogTitle>
              <DialogContent>
               <div className="loginContain">
                  <Container >
                  <div className="username">
                  <label htmlFor="">Email</label>
                  <input autoComplete="Off" value={loginEmail} type="text" onChange={(e)=>{setLoginEmail(e.target.value)}} />
                  </div>
                  <div className="password">
                  <label htmlFor="">Password</label>
                  <input  autoComplete="Off" value={loginPass} type="password" onChange={(e)=>{setLoginPass(e.target.value)}} />
                  </div>
                  <div className="buttonContainer">
                  
                    <Button variant="contained" color="default" onClick={LoginToTheApp}>Login</Button>
                    <Button variant="contained" color="default" onClick={closeSignInForm}>Cancel</Button>

                 </div>
                </Container>
               
              </div>

            </DialogContent>
             </Dialog>
              </div>

               {/* Sign Up Form */}
         <div className="signupform">
              <Dialog className="login_popup"  aria-labelledby="simple-dialog-title" open={signUpForm}>
              <DialogTitle id="simple-dialog-title">Sign Up</DialogTitle>
              <DialogContent>
               <div className="loginContain">
                  <Container >
                  <div className="username">
                  <label htmlFor="">UserName</label>
                  <input  autoComplete="Off" onChange={(e)=>{setdname(e.target.value)}} type="text" />
                  </div>   
                  <div className="username">
                  <label htmlFor="">Email</label>
                  <input  autoComplete="Off" onChange={(e)=>{setRegUser(e.target.value)}} type="text" />
                  </div>
                  <div className="password">
                  <label htmlFor="">Password</label>
                  <input  autoComplete="Off" onChange={(e)=>{setRegPass(e.target.value)}} type="password" />
                  </div>
                  <div className="password">
                  <label htmlFor="">Confirm Password</label>
                  <input  autoComplete="Off" onChange={(e)=>{setRegconfirmPass(e.target.value)}}  type="password"  />
                  </div>
                  <div className="buttonContainer">
                  
                    <Button variant="contained" color="default" onClick={RegisterUser}>Register </Button>
                    <Button variant="contained" color="default" onClick={closeSignUpForm}>Cancel</Button>

                 </div>
                </Container>
               
              </div>

            </DialogContent>
             </Dialog>
              </div>
        </>
    )
}

export default Header
