const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.drert.mongodb.net/dbVoiture', 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        err => {
            if (!err) console.log('Mongodb connected');
            else console.log(`Connection error: ${err}`);
        }
    )