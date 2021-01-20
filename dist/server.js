"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`Ejecutandose en el puerto ${PORT}`);
});
//https://github.com/firebase/quickstart-js/blob/691a9f51ea1849c76e09f46f1e4c83e82672da7a/auth/email-password.html#L95-L107
