
let registerformEl = document.getElementById("registerform");
let registerusernameEl= document.getElementById("registerusername");
let registerpasswordEl= document.getElementById("registerpassword");
let registerusernameEmptyEl= document.getElementById("registerusernameEmpty");
let registerpasswordEmptyEl= document.getElementById("registerpasswordEmpty");

let nameEl =document.getElementById("name");
let nameEmptyEl=document.getElementById("nameEmpty");

let genderMaleEl =document.getElementById("genderMale");
let genderFemaleEl= document.getElementById("genderFemale");

let success;

let registerFormData={
  name:"-",
  username:"",
  password:"",
  gender:"male"
};


nameEl.addEventListener("change",function(event){
  registerFormData.name=event.target.value;
});
registerusernameEl.addEventListener("change",function(event){
  if(event.target.value==="")
  {
      registerusernameEmptyEl.textContent= "Required*";
  }
  else{
      registerusernameEmptyEl.textContent= "";
  }

  registerFormData.username=event.target.value;
});
registerpasswordEl.addEventListener("change",function(event){
  if(event.target.value==="")
  {
      registerpasswordEmptyEl.textContent= "Required*";
  }
  else{
      registerpasswordEmptyEl.textContent= "";
  }
  
  registerFormData.password=event.target.value;
});

genderMaleEl.addEventListener("change",function(event){
  registerFormData.gender=event.target.value;
});
genderFemaleEl.addEventListener("change",function(event){
  registerFormData.gender=event.target.value;
});


function validateFormData(registerFormData) {
  let {username, password} = registerFormData;
  if(username === "" || password === ""){
    if (username === "") {
      registerusernameEmptyEl.textContent= "Required*";
    }
    if (password === ""){
      registerpasswordEmptyEl.textContent= "Required*";
    }
  }
  else{
    success=1;
  }
}
function gotoLogin()
{
  document.location.href="index.html";
  alert("User Registered SuccessFully");
}

function submitFormData(registerFormData) {
  
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(registerFormData)
  };

  let url = "http://localhost:4000/users/";
  try {
    fetch(url, options)
    .then(function(response) {
      return response.status;
    })
    .then(function(status){
      
        if(status===400){
          registerusernameEmptyEl.textContent= "*Username Already Exist";
        }else {
          gotoLogin();
        }
      
    });
  } catch (error) {
    console.log(error);
  }
  
    
}

registerformEl.addEventListener("submit", function(event) {
  event.preventDefault();
  validateFormData(registerFormData);
  if(success===1){
  submitFormData(registerFormData);
  }
});