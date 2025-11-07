"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: (process.env.CORS_ORIGINS ||
            'http://localhost:3000,http://localhost:3002,http://10.160.2.165:3000').split(','),
        credentials: true,
    });
    await app.listen(process.env.PORT || 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map