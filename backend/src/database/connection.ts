import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

export const connectToDatabase = () => {
  const connectionString = process.env.DB_CONNECTION_STRING ?? '';

  mongoose
    .connect(connectionString)
    .then(() => {
      console.log('Database successfully connected to %s', connectionString);
    })
    .catch((err) => {
      console.error('Database connection error:', err.message);
      process.exit(1);
    });
};
