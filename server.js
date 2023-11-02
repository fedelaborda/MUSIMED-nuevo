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
const funciones_1 = require("./funciones");
const express_1 = __importDefault(require("express"));
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { User } = prisma;
const jwt = require('jsonwebtoken');
const jwtSecret = 'tuClaveSecreta';
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
//app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with the allowed domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // If using credentials
    res.setHeader('Access-Control-Expose-Headers', 'Custom-Header-Name');
    res.setHeader('Access-Control-Max-Age', '3600');
    //if (req.method === 'OPTIONS') {
    //res.sendStatus(200); // Handle preflight request
    //}
    next(); // Continue with the actual request
});
/*const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});*/
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//app.get('/', (req, res) => {
//res.send('Hello World!');
//});
app.post('/api/CrearUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from the request body
    const data = req.body;
    // console.log(req);
    const registrado = yield (0, funciones_1.registerUsuario)(data.name, data.email, data.password, data.confirmPassword);
    //return res.sendStatus(200);
    console.log(registrado);
    if (registrado) {
        console.log("se registro bien");
        res.status(200).json({ message: "se registro bien" });
    }
    else {
        console.log("no se registro nada");
        res.status(400).json({ message: "se registro mal" });
    }
}));
app.post('/api/CrearUsuarioProfesional', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from the request body
    const data = req.body;
    // console.log(req);
    const proRegistro = yield (0, funciones_1.registerProfesional)(data.dni, data.name, data.surName, data.email, data.password, data.confirmPassword);
    //return res.sendStatus(200);
    console.log(proRegistro);
    if (proRegistro) {
        console.log("registro bien");
        res.status(200).json({ message: "registro bienn" });
    }
    else {
        console.log("no registro correctamente");
        res.status(400).json({ message: "no se registro de manera correcta" });
    }
}));
/*async function login(email: string, password: string)boolean{
    const storedUsername = "mailusuario";
    const storedPassword = "contrasenia";
    if(username === storedUsername && password === storedPassword){
        return true;
  } else {
    // Las credenciales son incorrectas
    return false;
  }
    }
}
login(af, ADF);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/getUsers', (req, res) => {
    //

    //
})

//
app.post('/api/createRegular', (req, res) => {
    //
    const {param1, param2 } = req.body;
    res.json({ message: 'POST request received successful'});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});*/
/*const jwt = require('jsonwebtoken');

//const app = express();
//app.use(express.json());

const secretKey = 'pedritomartin';

// Endpoint para la autenticación y generación de tokens
app.post('/login', (req, res) => {
  // Aquí verificarías las credenciales del usuario y, si son válidas, generas tokens.


  const usuario = { id: 1, email: 'email Ejemplo', password: 'contra ejemplo' };

  // Genera un token de acceso
  const tokenAcceso = jwt.sign(usuario, secretKey, { expiresIn: '15m' });

  // Genera un refresh token
  const refreshId = usuario.id.toString();
  const refreshToken = jwt.sign({ id: refreshId }, secretKey);

  // Almacena el refresh token de manera segura en el lado del cliente (por ejemplo, en una cookie HttpOnly y Secure)
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

  // Devuelve el token de acceso al cliente
  res.json({ tokenAcceso });
});

// Endpoint para renovar el token de acceso usando el refresh token
app.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(401); // No se proporcionó el refresh token.
  }

  try {
    // Verifica el refresh token
    const decoded = jwt.verify(refreshToken, secretKey);

    // Genera un nuevo token de acceso
    const usuario = { id: decoded.id, nombre: 'Usuario Ejemplo' };
    const tokenAcceso = jwt.sign(usuario, secretKey, { expiresIn: '15m' });

    // Devuelve el nuevo token de acceso al cliente
    res.json({ tokenAcceso });
  } catch (error) {
    return res.sendStatus(403); // El refresh token es inválido o ha expirado.
  }
});

// Inicia el servidor
const port2 = 4000;
app.listen(port2, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port2}`);
});
*/
/*app.post('/api/iniciarSesion', (req, res) => {
  if(req.body.name == "shulian" && req.body.password == "informatica"){
      const user = {
      id: 1,
      nombre: 'shulian',
      password: 'informatica',
       
    };
    const token = jwt.sign(user, jwtSecret, { expiresIn: '1h' });

    res.json({
      message:"valido",
      token: token
    });
  }

  else{
    res.json({
      message:"invalido"
    })
  }
})

login("ernesto", "qwerty")*/
//INICIO USUARIO REGULAR
app.post('/api/IniciarSesion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from the request body
    const mail = req.body.email;
    const pass = req.body.password;
    const logeado = yield (0, funciones_1.login)(mail, pass);
    if (logeado) {
        const user = {
            id: 123,
            email: 'usuarioEjemplo',
            nombre: 'usuario'
        };
        const token = jwt.sign(user, jwtSecret, { expiresIn: '1h' });
        console.log("se inicio bien");
        res.status(200).json({ token });
        //return res.sendStatus(200);
    }
    else {
        console.log("se inicio mal");
        res.status(400).json({ message: "no es true" });
    }
}));
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) {
                return res.json({
                    message: "error"
                });
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
app.get('/api/prueba', authenticateJWT, (req, res) => {
    const userInfo = req.user;
    res.json({
        message: "todo bien",
        userInfo
    });
});
//INICIO PROFESIONAL
app.post('/api/IniciarSesionProfesional', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from the request body
    const mail = req.body.email;
    const pass = req.body.password;
    const logeado = yield (0, funciones_1.loginProfesional)(mail, pass);
    if (logeado) {
        const user = {
            id: 123,
            email: 'usuarioEjemplo',
            nombre: 'usuario'
        };
        const token = jwt.sign(user, jwtSecret, { expiresIn: '1h' });
        console.log("se inicio bien");
        res.status(200).json({ token });
        //return res.sendStatus(200);
    }
    else {
        console.log("se inicio mal");
        res.status(400).json({ message: "no es true" });
    }
}));
const authenticateProJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) {
                return res.json({
                    message: "error"
                });
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
app.get('/api/pruebaPro', authenticateProJWT, (req, res) => {
    const userInfo = req.user;
    res.json({
        message: "todo bien",
        userInfo
    });
});
// app.post('/api/iniciarsesion',async (req:Request, res:Response) => {
//   try {
//     const email = req.body.email
//     const password = req.body.password
//     const logeado = await login(email, password)
//     if(logeado){
//       const user = {
//         id: 123,
//         username: 'usuarioEjemplo',
//         role: 'usuario'
//       };
//       const token = jwt.sign(user, jwtSecret, {expiresIn: "1h"})
//       // 500 internal server error
//       // 404 not found
//       // 200 ok
//       // 401 unathorized
//       //skdKJDHAJSjdhasdhajksdhakjshdjaksdH
//       // token: skdalskdjaslkdjaklsdja
//       // response.data.token
//       return res.status(200).json({token: token})
//     }
//   } catch (error) {
//     return res.status(500).json({error: "Internal Server Error"})
//   }
// })
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
