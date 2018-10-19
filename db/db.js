const mongoose = require("mongoose");

const mongodb = process.env.MONGODB_URI || 'localhost';
mongoose.connect("mongodb://sudoUser:sudoUs3r@ds163402.mlab.com:63402/hs-leaderboard");

mongoose.connection.on("connected", () => {
    console.log("connected to dataBASS")
});

mongoose.connection.on("error", (err) => {
    console.log(err, "Mongoose failed to connect")
});

mongoose.connection.on("disconected", () => {
    console.log("Mongoose is disconnected")
});
