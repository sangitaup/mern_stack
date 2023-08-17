const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/e-commerse",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4

});