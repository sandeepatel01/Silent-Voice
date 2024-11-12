import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      directConnection: true,
    });
    //     console.log(db);

    connection.isConnected = db.connections[0].readyState;
    //     console.log(db.connections);

    console.log("DB Connected successfully");
  } catch (error) {
    console.log("DB Connection Failed: ", error);
    process.exit(1);
  }
}

export default dbConnect;
