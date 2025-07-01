import db from '../src/config/db.js';
import bcrypt from 'bcrypt';

const form_login = async (req, res) => {
    const { email, password } = req.body;

  try {
    // 1. Buscar usuario por email
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const user = users[0];

    // 2. Comparar la contraseña
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    // 3. Éxito: devolver datos del usuario (sin contraseña)
    const { id, name, email: userEmail, created_at } = user;

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      user: {
        id,
        name,
        email: userEmail,
        created_at
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

const form_register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }

    try {
        // Verifica si ya existe el usuario
        const existing = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(409).json({ msg: 'El correo ya está registrado' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const now = new Date();
        // Insertar usuario
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword] // Nota: en un caso real deberías encriptar la contraseña
        );

        res.status(201).json({ msg: 'Usuario creado', userId: Number(result.insertId) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al crear el usuario' });
    }
};

const get_users = async (req, res) => {
    try {
        const rows = await db.query('SELECT * FROM users');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export {
    form_login,
    form_register,
    get_users
}