const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const flujo1 = addKeyword("OK").addAnswer("segunda respuesta flujo 1");

const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer('Hola bienvenido al Chatbot de Rafa', {
        media: "https://freesvg.org/img/robot.png",
        capture: true,
    }, async (ctx, ctxFn) => {
        // ctxFn.flowDynamic("Hola desde el flow dynamic");
    }, [flujo1]);

const flowAction = addKeyword("action").addAction(async (ctx, ctxFn) => {
    console.log(ctx.body);
    ctxFn.flowdynamic("hola despues de action");
});

const flow2 = addKeyword(EVENTS.MEDIA).addAnswer('Flow de media de Hector');

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, flow2, flowAction]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();
