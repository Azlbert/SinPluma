import api from "../common/Api";

async function startSession({email, password}) {
    if(sessionStorage.getItem("accessToken") != null) {
        console.log("Already set: " + sessionStorage.getItem("accessToken"));
        sessionStorage.clear();
        return;
    }
    try{
       const myJSON = JSON.stringify({
           username: email,
           password: password
       });
       let response = await api.post('auth', myJSON, {
           headers: {
               'Content-Type': 'application/json',
           }
       });
       sessionStorage.setItem("accessToken", response.data.access_token);
       console.log("Saved!");
   } catch(e){
       console.log('Error');
   }
};

export default startSession;