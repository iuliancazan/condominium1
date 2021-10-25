import HashUtils from "./hashUtils.js"
import Directus from "./directus.js"
import DirectusURL from "./directusURL.js"
const client = new DirectusSDK();


let hashUtils = new HashUtils();
let directus = new Directus();
const directusURL = new DirectusURL();

class Register {
    constructor() {
        this.user = {}
        this.registerForm = document.getElementById("registerForm");
        this.events();
    }


    async events(){
        this.registerForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // console.log(event)

            this.user.username = event.target[0].value;
            this.user.email = event.target[1].value;
            this.user.password1 = event.target[2].value;
            this.user.password2 = event.target[3].value;
            this.user.terms = event.target[4].checked;

            console.log("Input: ", this.user);

            let check = this.checkInput().then(res => {
                if (res) {
                    client.login({
                        url: directusURL.info[0].url,
                        project: directusURL.info[0].project,
                        email: directusURL.info[0].email,
                        password: directusURL.info[0].password
                      }).then(() => {
                        console.log("Create user: ", this.user.username, this.user.email, this.user.password1)
                        client.createItem("users", {
                            username: this.user.username,
                            email: this.user.email,
                            password: this.user.password1,
                            status: "published"
                          })
                      }).then(() => {
                        alert("User created, please login with your credentials ...", this.user);
                        window.location.href = "./index.html"; 
                      })
                      .catch(error => console.error("Eroare: ", error));

                } else {
                    // alert("Not OK!");
                }
            });

        })
    }

    async checkInput() {
        let check = false;

        if (await this.checkUsername(this.user.username)) {
            alert("User already exists, please choose another one")
        } else if (await this.checkEmail(this.user.email)) {
            alert("Email address already in use");
        } else if (this.user.password1.length < 8){
            alert("At least 8 characters required for the password");
        } else if (!(this.user.password1 === this.user.password2)) {
            alert("Passwords do not match");
        } else if (!this.user.terms) {
            alert("Please accept the Terms and Conditions of the site and the Information Data Policy.");
        } else {
            check = true;
        }

        return check;
    }

    async checkUsername(user) {
        // Checking if user exists
        let found = null;
        let users = await directus.getItems("users").then(data => {
            data.data.forEach((item, i) => {
                if (item.username === user) {
                    // Found the item, return it's ID
                    // console.log("Matched input with: ", item)
                    found = item.id;
                } 
            });
        });
        // No user found, return null
        return found;
    }

    async checkEmail(email) {
        // Checking if user exists
        let found = null;
        let users = await directus.getItems("users").then(data => {
            data.data.forEach((item, i) => {
                if (item.email === email) {
                    // Found the item, return it's ID
                    // console.log("Matched input with: ", item)
                    found = item.id;
                } 
            });
        });
        // No user found, return null
        return found;
    }

    checkPasswords(pass1, pass2) {

    }
}

export default Register;