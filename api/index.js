const express = require('express')
const connectToMongo = require('./config/db');
const cors = require('cors');
const axios = require("axios");
const { PRIVATE, PROJECT } = require('../../config/config');
const app = express()
const port = 4000

app.use(cors());
connectToMongo();
app.use(express.json());

app.get('/', (req, res) => {
  res.send({"result":"true"})
})


app.post("/signup", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;

  // Store a user-copy on Chat Engine!
  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email, first_name, last_name },
      { headers: { "Private-Key": PRIVATE } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;

  // Fetch this user from Chat Engine in this project!
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": PROJECT,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});





var indexRouter = require('./routes/index');
app.use('/api', indexRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})