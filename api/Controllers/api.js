const axios = require("axios");

const swapiUrl = "https://swapi.dev/api/";

async function getData(path, params) {
  try {
    res = await axios.get(swapiUrl + path, {
      params: {
        search: params.search,
        wookie: params.wookie,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

module.exports = { getData: getData };
