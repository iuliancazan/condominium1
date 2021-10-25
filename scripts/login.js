import HashUtils from "./hashUtils.js"
import Directus from "./directus.js"
let hashUtils = new HashUtils();
let directus = new Directus();

class Login {
    constructor() {
        this.loginForm = document.getElementById("loginForm");
        this.events();
    }

    events() {
        this.loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            let check = this.checkUserPass(event.target[0].value, event.target[1].value).then(res => {
                if (res) {
                    // Username & password are ok, redirect to the dashboard
                    window.location.href = "dashboard.html";
                };
            });
        })
    }

    async checkUserPass(user, pass) {
        let dbHash = '';
        // check if user exists
        const id = await this.checkUser(user);
        if (id) {
            // get the hashed password from the db
            let usr = await directus.getItemByID("users", id).then(data => {
                dbHash = data.data[0].password;
            });
        } else {
            // user does not exist -> send and error message and return false
            alert("User not found!");
            return false;
        }
        // check the input password against the hash from the db
        const vh = await this.checkPass(pass, dbHash);
        if (!vh) alert("Password does not match!")
        return vh;
    }

    async checkPass(pass, hash) {
        // console.log("checkPass> Checking if '"+ pass +"' matches '"+ hash +"' ...");
        let result = false;
        let vh = await hashUtils.verifyHash(pass, hash).then(res => {
            result = res;
        })
        return result;
    }

    async checkUser(user) {
        // Checking if user exists
        let found = null;
        let users = await directus.getItems("users").then(data => {
            data.data.forEach((item, i) => {
                if (item.username === user) {
                    // Found the item, return it's ID
                    found = item.id;
                } 
            });
        });
        // No user found, return null
        return found;
    }
}


export default Login;