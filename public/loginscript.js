//login page js code
let loginformEl = document.getElementById('loginform');
let loginusernameEl= document.getElementById('loginusername');
let loginpasswordEl= document.getElementById('loginpassword');
let loginusernameEmptyEl= document.getElementById('loginusernameEmpty');
let loginpasswordEmptyEl= document.getElementById('loginpasswordEmpty');
let getProfileEl= document.getElementById('getProfile');
let success;
var jwt="";
let loginFormData={
  username:"" ,
  password:""
};

loginusernameEl.addEventListener("change",function(event){
  if(event.target.value==="")
  {
      loginusernameEmptyEl.textContent= "Required*";
  }
  else{
      loginusernameEmptyEl.textContent= "";
  }

  loginFormData.username= event.target.value;
});

loginpasswordEl.addEventListener("change",function(event){
    if(event.target.value==="")
    {
        loginpasswordEmptyEl.textContent= "Required*";
    }
    else{
        loginpasswordEmptyEl.textContent= "";
    }

    loginFormData.password= event.target.value;
});

function validateFormData(loginFormData) {
  let {username, password} = loginFormData;
  if(username ==="" || password===""){
    if (username === "") {
      loginusernameEmptyEl.textContent= "Required*";
    }
    if (password === ""){
      loginpasswordEmptyEl.textContent= "Required*";
    }
  }
  else{success=1;}
}

function gotoMain(){
document.location.href= "home.html";
}

function submitFormData(loginFormData){
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(loginFormData)
  };

  let url = "http://localhost:4000/login/";
  try {
    fetch(url, options)
    .then(function(response) {
      if(response.status===400){
        loginusernameEmptyEl.textContent="*Invalid Username";
        }
      if(response.status===401){
          loginpasswordEmptyEl.textContent="*Invalid password";
          }
      return response.json();
    })
    .then(function(jsonData){
      jwt=jsonData.jwtToken;
      gotoMain();
      console.log(jwt);
    });
  } catch (error) {
    console.log(error);
  }
}


loginformEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateFormData(loginFormData);
    if(success===1){
    submitFormData(loginFormData);
    }
});

export default jwt;

