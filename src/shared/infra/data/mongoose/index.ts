import mongoose from 'mongoose';

try {
  console.log('connecting mongoose...');
  mongoose.connect(
    'mongodb+srv://blogfy:blogfy123@cluster0.o37eq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  );
} catch (ex) {
  console.log(ex);
}
