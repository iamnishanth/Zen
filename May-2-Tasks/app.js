// "npm run nodemon" to run the server

const express = require("express");
const app = express();

app.use(express.json());

// stores room and customer info
let rooms = [
  {
    id: 1,
    name: "Private Suite" + 1,
    seats: 20,
    amenities: ["WIFI", "TV", "Parking", "Food"],
    price: 2000,
    bookingStatus: [],
  },
];

// homepage route to guide users
app.get("/", (req, res) => {
  res.write("<h1>Welcome to Hall Booking App</h1>");
  const htmlElement = `<ol>
    <li>post to /add-room to create a room</li>
    <li>post to /book-room/:id to book a room</li>
    <li>go to /list-rooms to to get all the booked rooms</li>
    <li>go to /list-customers to get all the booked customers</li>
  </ol>`;
  res.write(htmlElement);
  res.end();
});

// add room route to create a new room
app.post("/add-room", (req, res) => {
  let data = {
    id: rooms.length + 1,
    name: "Private Suite" + (rooms.length + 1),
    seats: req.body.seats,
    amenities: req.body.amenities,
    price: req.body.price,
    bookingStatus: [],
  };

  rooms.push(data); // pushing new room to rooms variable
  res.json({ message: "Room has been created successfully" });
});

// book a room
app.post("/book-room/:id", (req, res) => {
  // check whether room with a given id is available
  let roomAvailable = rooms.find((obj) => obj.id == req.params.id);
  if (roomAvailable) {
    // check whether that room is already booked
    if (roomAvailable.bookingStatus.length === 0) {
      let date = new Date().toLocaleString();
      let data = {
        customerName: req.body.customerName,
        date: date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        id: req.params.id,
      };
      roomAvailable.bookingStatus.push(data);
      res.json({ message: "Room has been booked. Enjoy your suite" });
    } else {
      res.json({ message: "Room already booked. Try another room." });
    }
  } else {
    res.json({ message: "There is no room with id" + req.params.id });
  }
});

// list all the booked rooms
app.get("/list-rooms", (req, res) => {
  let bookedRooms = rooms.filter((obj) => obj.bookingStatus.length > 0);
  let data = [];
  bookedRooms.forEach((obj) => {
    let dataObj = {
      roomName: obj.name,
      bookedStatus: "Booked",
      customerName: obj.bookingStatus[0].customerName,
      date: obj.bookingStatus[0].date,
      startTime: obj.bookingStatus[0].startTime,
      endTime: obj.bookingStatus[0].endTime,
    };
    data.push(dataObj);
  });
  res.json(data);
});

// list all the room booked customers
app.get("/list-customers", (req, res) => {
  let bookedRooms = rooms.filter((obj) => obj.bookingStatus.length > 0);
  let data = [];
  bookedRooms.forEach((obj) => {
    let dataObj = {
      customerName: obj.bookingStatus[0].customerName,
      roomName: obj.name,
      date: obj.bookingStatus[0].date,
      startTime: obj.bookingStatus[0].startTime,
      endTime: obj.bookingStatus[0].endTime,
    };
    data.push(dataObj);
  });
  res.json(data);
});

// server starts at localhost 3000 port
app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started on port 3000");
  }
});
