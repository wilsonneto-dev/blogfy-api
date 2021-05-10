import mongoose from 'mongoose';

mongoose.connect(
  'mongodb+srv://blogfy:blogfy123@cluster0.o37eq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
);
