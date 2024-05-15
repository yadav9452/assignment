import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
 
  const userRes={
    isAuth:false,
    token:""
  }
export const AuthContext =createContext();
// eslint-disable-next-line react/prop-types
export const AuthContextProvider=({children})=>{
      const [isLoggedIn, setLoggedIn] = useState(userRes);
   
      const handleLogin = async({ email, password }) => {
         // eslint-disable-next-line no-async-promise-executor
         return new Promise(async(resolve,reject)=>{
            try {
                console.log(email,
                  password)
                const res = await axios.post("https://universitydashboard.onrender.com/student/login", {
                  email,
                  password,
                });
                // setAuth(res.data.isAuth);
                if(res){
                  setLoggedIn({
                    isAuth:true,
                    token:res.data.accessToken
                  })
                }
                console.log(res.data.accessToken)
                localStorage.setItem("accessToken",res.data.accessToken);
                resolve();
              } catch (error) {
                console.log(error);
                reject();
              }
            
         })
         
      };


      console.log(isLoggedIn);
    
     
      const handleLogout = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const res = await axios.get("http://localhost:8080/users/logout", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res);
          setLoggedIn(userRes);
          localStorage.removeItem("accessToken");
        } catch (error) {
          console.log(error);
        }
      };
   
   
   
   
    return(
        <AuthContext.Provider value={{handleLogin,handleLogout,isLoggedIn,setLoggedIn}}>
             {children}
        </AuthContext.Provider>
    )
}
