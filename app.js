const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
require("dotenv").config();

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MongoAdapter = require('@bot-whatsapp/database/mongo')

const { writeToSheet, appendToSheet, readSheet, getFilteredData } = require("./googlesheets");


const flowSheets = addKeyword("sheets").addAnswer("Este es el flujo Sheets", null,
    async (ctx, ctxFn) => {
        const values = [
            ['mimi', 25, 'chile', "teamo"],
            ['rafa', 30, 'mexico', "yomas"]
        ];


        //let range = 'G2';
        //await writeToSheet(values, range); // Escribe datos en un rango específico.

        //await appendToSheet(values); // Agrega datos columna por columna.
        //range = 'A1:B10';
        //const response = await readSheet(range); // Lee datos de un rango.

        const response = await getFilteredData("A", "Mark")
        console.log(response);
    });

const main = async () => {
    const adapterDB = new MongoAdapter({
        dbUri: process.env.MONGO_DB_URL,
        dbName: "test", // Cambia esto si tu base de datos tiene otro nombre
    });

    const adapterFlow = createFlow([flowSheets]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();
