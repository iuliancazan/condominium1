import HashUtils from "./hashUtils.js"
import Login from "./login.js"
import Register from "./register.js"
import Directus from "./directus.js"

const client = new DirectusSDK();
let hashUtils = new HashUtils();
let directus = new Directus();


// Pseudo-router
let sPath = window.location.pathname;
let sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
switch (sPage) {
  case 'index.html':
    let login = new Login();
    break
    
  case 'register.html':
    let register = new Register();
    break

  case 'dashboard.html':
    // alert("dashboard.html");
    break
}




// This returns a promise - don't try to access any data until this promise resolves
// client.login({
//   url: "http://userstest.directus/",
//   project: "userstest",
//   email: "webmaster@nodlab.ro",
//   password: "Admin1234"
// }).then(() => {
//     // client.getItems("invoices")
//     // .then(data => {
//     //   // Do something with the data
//     //   console.log("Invoices: ", data)
//     // }).catch(error => console.error("Eroare: ", error));

//     // client.getCollections()
//     // .then( data => {
//     //     // console.log("Collections: ", data);
//     //   });

// }).catch(error => console.error("Eroare: ", error));


// On Load


