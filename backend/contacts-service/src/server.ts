import app from "./app";
import database from 'ms-commons/data/db';

(async () => {

    try {
        const port = parseInt(`${process.env.PORT}`)

        await database.sync();
        console.log(`Runing database ${process.env.DB_NAME}`);

        await app.listen(port);
        console.log(`Running on port ${port}`);
    } catch (e) {
        console.log(`${e}`)
    }
})();