const express = require("express");
const cors = require("cors");
const https = require("https");

const PORT = process.env.PORT || 4000

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



app.get("/fetch", async (req, res) => {
  https
    .get("https://randomuser.me/api", (result) => {
      let data = "";
      result.on("data", (chunk) => {
        data += chunk;
      });
      result.on("end", () => {
        data = JSON.parse(data);
        data = data.results;
        
        res.status(200).send(data);
      });
    })
    .on("error", (err) => {
      console.log(err.message);
    });
});

app.listen(PORT, () => {
  console.log("Server started on http://localhost:4000");
});
