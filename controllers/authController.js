const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password harus diisi' });
    }

    // Cek apakah username sudah digunakan
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah digunakan' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const user = await User.create({
      username,
      password: hashedPassword,
      role: role || 'student' // Default role adalah 'student'
    });

    res.status(201).json({ message: 'Registrasi berhasil', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password harus diisi' });
    }

    // Cari pengguna berdasarkan username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Pengguna tidak ditemukan' });
    }

    // Cek password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Password salah' });
    }

    // Buat token JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET, // Menggunakan JWT_SECRET dari .env
      { expiresIn: '1h' } // Token berlaku selama 1 jam
    );

    res.json({ message: 'Login berhasil', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
