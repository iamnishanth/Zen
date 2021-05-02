const express = require("express");
const fs = require("fs");

const app = express();

const dir = "/home/iamnishanth/Meow/Zen/May-1-Tasks/textFolder";
let files = [];

// function to read directory
const readDirectory = () => {
  files = [];
  fs.readdirSync(dir).forEach((file) => {
    files.push(file);
  });
};

// function to write new files in the directory
const writeFile = async () => {
  let date = new Date() // Modifying date object string to create file name
    .toLocaleString()
    .split(",")
    .join("-")
    .split("/")
    .join("-")
    .split(" ")
    .join("");
  fs.writeFileSync(`${dir}/${date}.txt`, date, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File created");
    }
  });
};

// retrieves all files in directory and sends it as response
app.get("/", (req, res) => {
  readDirectory();
  res.set("Content-Type", "text/html");
  res.write("<h1>Files inside text folder</h1>");
  res.write("<p>To create files head over to /add route </p>");
  if (files.length === 0) {
    res.write("<h3>Currently there is not files</h3>");
  }
  files.forEach((element) => {
    res.write(`<h3>${element}</h3>`);
  });
  res.end();
});

// creates a new file in directory
app.get("/add", (req, res) => {
  writeFile();
  res.send(`<h3>File created successfully</h3><a href=" / ">Go back</a>`);
});

// serves the server in 3000 port
app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running on port 3000");
  }
});
