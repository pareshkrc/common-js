const mongoose = require("mongoose");

module.exports = {
    /**
     * connect to mongoDB
     */
    connect: function () {
        // Set up default mongoose connection
        var mongoDB = Cypress.env("dbUrl");
        console.log(
            ">> connecting to the environment [%s] MongoDB...",
            mongoDB.split("/")[mongoDB.split("/").length - 1]
        );
        // Get Mongoose to use the global promise library
        mongoose.Promise = global.Promise;
        mongoose.connect(mongoDB, {
            useNewUrlParser: true
        });
        // Get the default connection
        var db = mongoose.connection;
        // Bind connection to error event (to get notification of connection errors)
        db.on(
            "error",
            console.error.bind(console, "******** ERROR: MongoDB connection error:")
        );
    }

    // /**
    //  * find any user by his email
    //  */
    // findUserByEmail: function (model, email) {
    //     console.log(">> finding user by { 'email' : '%s' } ...", email);
    //     const user = await model.findOne({
    //         email: email
    //     });
    //     return user;
    // }

    // /**
    //  * find user profile and update his document with new values
    //  */
    // findUserByEmailAndUpdate: async function (model, email, newDocValues) {
    //     console.log(
    //         ">> finding user by { 'email' : '%s' } & updating values in DB!",
    //         email
    //     );
    //     let options = {
    //         new: true
    //     };
    //     await model.findOneAndUpdate({
    //             email: email
    //         },
    //         newDocValues,
    //         options,
    //         (err, doc) => {
    //             if (err) {
    //                 console.log("******** ERROR: something wrong when updating data!");
    //             }
    //             console.log(">> document updated successfully!");
    //             console.log("---------- new document values ----------");
    //             console.log(JSON.stringify(newDocValues));
    //             console.log("-----------------------------------------");
    //         }
    //     );
    //     return findUserByEmail(email);
    // }

}