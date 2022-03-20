const path = require('path')
const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const {errorHandler , notFound } = require( "./middleware/errorMiddleware.js");
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());

const connectDB = async () => {
  try {
    const conn =  await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

// authentication route
app.use("/api/users", userRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __UploadDirname = path.resolve();
app.use("/uploads", express.static(path.join(__UploadDirname, "/uploads")));


  app.get("/", (req, res) => {
    res.send("API is running....");
  });

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
