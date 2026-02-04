import connectDb from "./db/connectionDb.js";
import { app } from "./app.js";
import { port } from "./constants.js";



connectDb()
    .then(() => {
        app.listen(port || 5000, () => {
            console.log(`Server is running at : https://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Server Failed to start!", err);
    });



