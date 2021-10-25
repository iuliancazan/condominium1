import DirectusURL from "./directusURL.js"
const directusURL = new DirectusURL();
const client = new DirectusSDK();

class Directus {
    constructor() {
        this.authorize();
    }

    authorize() {
        client.login({
            url: directusURL.info[0].url,
            project: directusURL.info[0].project,
            email: directusURL.info[0].email,
            password: directusURL.info[0].password
          }).then(() => {
            console.log("Authorised!")
        }).catch(error => console.error("Eroare: ", error));   
    }

    async getItems(collection) {
        const data = await client.getItems(collection)
        return data;
    }

    async getItemByID(collection, ID) {
        const data = await client.getItems(collection, {
            filter: {
                id: ID
                }
        });   
        return data;
    }

}

export default Directus;