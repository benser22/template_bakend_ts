import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase',
      {
        // Opciones de conexión se pueden agregar aquí si es necesario
      },
    );
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectToDatabase;
