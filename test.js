const axios = require("axios");

async function get() {
  try {
    const tokenDetails = await axios.post(
      "https://api.helloclue.com/access-tokens",
      { email: "drmikhailova@gmail.com", password: "hicseB-mehta7-buhwuf" }
    );
    console.log(tokenDetails);
    setLoggedIn(true);
  } catch (e) {
    console.log(e);
  }
}

get();
