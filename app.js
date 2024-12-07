const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require("@bot-whatsapp/bot");
require("dotenv").config();

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer("Saludos desde cloud", null,
        async (ctx, ctxFn) => {
            console.log("Estoy correctamente deployado");
        }
    );

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();

