import DirectusURL from "./directusURL.js"
const directusURL = new DirectusURL();

class hashUtils {
    constructor() { }

    createHash(string) {
        const _body = {
          "string": string
        }
      
        fetch(`${directusURL.info[0].url}/${directusURL.info[0].project}/utils/hash`, {
          method: "POST",
          body: JSON.stringify(_body),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => {
          console.log("createHash obj response for '"+ string +"': ", json);
          // console.log("-> hash: ", json.data.hash)
          return json.data.hash;
        })
        .catch(err => console.log(err));
    }

    async verifyHash(string, hash) {
        const _body = {
          "hash": hash,
          "string": string
        }
      
        const response = await fetch(`${directusURL.info[0].url}/${directusURL.info[0].project}/utils/hash/match`, {
          method: "POST",
          body: JSON.stringify(_body),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        });

        const json = await response.json();

        console.log("verifyHash>> response: ", json.data.valid);
        
        return json.data.valid

    }
}

export default hashUtils;