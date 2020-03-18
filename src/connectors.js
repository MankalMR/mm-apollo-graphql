const axios = require("axios");

const resources = () => {
  return axios
    .get(
      "https://my-json-server.typicode.com/MankalMR/tech-resource-finder/resources"
    )
    .catch(err => console.log(err));
};

module.exports = { resources };
