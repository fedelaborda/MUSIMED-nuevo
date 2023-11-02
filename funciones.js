"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerProfesional = exports.registerUsuario = exports.loginProfesional = exports.login = void 0;
const express_1 = __importDefault(require("express"));
//import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { User, Profesionalsalud } = prisma;
const app = (0, express_1.default)();
const port = 5000;
// REGISTRO VIEJO
/*async function createRegular() {
  try {
    const newUser = await prisma.User.create({
      data: {
        name: "fede",
        email: "pepe",
        password: "qwerty",
        confirmPassword:"qwerty"
      },
    });
    console.log("usuario creado", newUser);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
createRegular(); */
/*async function createProfesional() {
  try {
    const newProfesional = await prisma.Profesionalsalud.create({
      data: {
        dni: 88888888,
        name: "valentino",
        surName: "baldu",
        email: "baldu@gmail.com",
        password: "12345",
        confirmPasword: "12345",
      },
    });
    console.log("profesional creado", newProfesional);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
createProfesional(); */
//Obtener nombre de usuario (para ver si existe o no un usuario)
let validmail = "af";
function obtenerNombresUsuarios() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hola = yield prisma.User.findUnique({
                where: {
                    email: "rifle@gmail",
                },
                select: {
                    name: true,
                },
            });
            if (hola) {
                console.log("nombre de usuario encontrado:", hola.name);
            }
            else {
                console.log("usuario no encontrado");
            }
        }
        catch (error) {
            console.error("error al encontrar el usuario:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
obtenerNombresUsuarios();
//LOG IN USUARIO NORMAL
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // Buscar el usuario en la base de datos utilizando Prisma
        const user = yield prisma.user.findUnique({ where: { email } });
        if (user && user.password === password) {
            // Las credenciales son correctas
            console.log("iniciaste piola pibe", email, password);
            return true;
        }
        else {
            // Las credenciales son incorrectas o el usuario no existe
            console.log("malisimo pifiaste");
            return false;
        }
    });
}
exports.login = login;
// Ejemplo de uso
/*const usernameInput = "pepe";
const passwordInput = "qwerty";

async function main() {
  const isLoggedIn = await login(usernameInput, passwordInput);

  if (isLoggedIn) {
    console.log("Inicio de sesión User exitoso");
  } else {
    console.log("Credenciales User inválidas");
  }

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
*/
//LOG IN PROFESIONAL
function loginProfesional(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // Buscar el usuario en la base de datos utilizando Prisma
        const Profesionalsalud = yield prisma.Profesionalsalud.findUnique({ where: { email } });
        if (Profesionalsalud && Profesionalsalud.password === password) {
            // Las credenciales son correctas
            return true;
        }
        else {
            // Las credenciales son incorrectas o el usuario no existe
            return false;
        }
    });
}
exports.loginProfesional = loginProfesional;
// Ejemplo de uso
const profesionalUsernameInput = "ana@gmail";
const profesionalPasswordInput = "ingles";
function main2() {
    return __awaiter(this, void 0, void 0, function* () {
        const isLoggedIn = yield loginProfesional(profesionalUsernameInput, profesionalPasswordInput);
        if (isLoggedIn) {
            console.log("Inicio de sesión profesional exitoso");
        }
        else {
            console.log("Credenciales profesionales inválidas");
        }
        yield prisma.$disconnect();
    });
}
main2().catch((error) => {
    console.error(error);
    process.exit(1);
});
// REGISTRO USUARIO NORMAL
function registerUsuario(username, email, password, confirmPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingMailUser = yield User.findUnique({
                where: { email },
            });
            const existingMailProfesional = yield Profesionalsalud.findUnique({
                where: { email },
            });
            if (existingMailUser || existingMailProfesional) {
                console.log("El correo electrónico ya está registrado para un médico o paciente.");
                return false;
            }
            // Crear un nuevo usuario
            const newUsuario = yield User.create({
                data: {
                    name: username,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                },
            });
            console.log("Usuario registrado:", newUsuario);
            return true;
        }
        catch (error) {
            console.error("Error al registrar el usuario:", error);
            return false;
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.registerUsuario = registerUsuario;
//registerUsuario("shulian", "shulian@gmail", "informatica", "informatica");
// REGISTRO USUARIO PROFESIONAL
function registerProfesional(dni, name, surName, email, password, confirmPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingMailUser = yield User.findUnique({
                where: { email },
            });
            const existingMailProfesional = yield Profesionalsalud.findUnique({
                where: { email },
            });
            if (existingMailUser || existingMailProfesional) {
                console.log("El correo electrónico ya está registrado para un médico o paciente.");
                return false;
            }
            // Crear un nuevo usuario
            const newProfesional = yield Profesionalsalud.create({
                data: {
                    dni: dni,
                    name: name,
                    surName: surName,
                    email: email,
                    password: password,
                    confirmPasword: confirmPassword,
                },
            });
            console.log("Profesional de la Salud registrado:", newProfesional);
            return true;
        }
        catch (error) {
            console.error("Error al registrar al Profesional de la Salud:", error);
            return false;
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.registerProfesional = registerProfesional;
//registerProfesional("47621344", "Pedro", "Galdo", "pedrogaldo@gmail", "flores", "flores");
//
