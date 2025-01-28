const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Street Fighter. Usa /usuarios para ver la lista de usuarios.');
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
});

app.post('/usuarios', (req, res) => {
    const { id, nombre, edad, lugarProcedencia } = req.body;
    if (!id || !nombre || !edad || !lugarProcedencia) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    const nuevoUsuario = { id, nombre, edad, lugarProcedencia };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

app.put('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    const { edad, lugarProcedencia } = req.body;
    const usuarioIndex = usuarios.findIndex(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    if (usuarioIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (edad) usuarios[usuarioIndex].edad = edad;
    if (lugarProcedencia) usuarios[usuarioIndex].lugarProcedencia = lugarProcedencia;
    res.json(usuarios[usuarioIndex]);
});

app.delete('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    const usuariosFiltrados = usuarios.filter(u => u.nombre.toLowerCase() !== nombre.toLowerCase());
    if (usuarios.length === usuariosFiltrados.length) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    usuarios = usuariosFiltrados;
    res.json({ message: 'Usuario eliminado correctamente' });
});

app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto http://localhost:${PORT}`);
});


