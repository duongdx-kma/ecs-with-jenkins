import express from 'express'
import os from 'os'
import data from './config/env.json' assert {type: 'json'}
import {getSecret} from "./secret_manager.js";

const app = express()

app.get('/', async (request, response) => {
    const clientIp = request.header('x-forwarded-for');
    const elbIp = request.socket.remoteAddress;
    const containerIp = request.socket.localAddress;
    const containerName = os.hostname();
    const typeEnvironment = data.TYPE_ENV;
    const productName = data.PRODUCT_NAME;
    console.log('hello root')
    const dbInfo = await getSecret();
    console.log('dataaaa', data)

    response.json({
        service: "Duongdx-root-service v3",
        contact: "xuanduong.kma@gmail.com",
        clientIp: clientIp,
        elbIp: elbIp,
        containerIp: containerIp,
        containerName: containerName,
        typeEnvironment: typeEnvironment,
        productName: productName,
        dbInfo: dbInfo,
        message: `hello world from Ha Noi, the VietNam's capital`
    })
})

app.listen(8088, () => {
    console.log('app started successfully')
})