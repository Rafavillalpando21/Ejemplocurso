require('dotenv').config();

const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const express = require('express');
const app = express();

// Ruta básica para el servidor
app.get('/', (req, res) => {
    res.send('¡Aplicación funcionando correctamente!');
});

// Configurar puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

// Configuración del flujo del bot
const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer('Saludos desde cloud', null, async (ctx, ctxFn) => {
        console.log("Estoy correctamente deployado");
    });

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


