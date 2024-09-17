const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  // Ambil token dari header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak, token tidak tersedia' });
  }

  // Verifikasi token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid' });
    }

    // Simpan informasi pengguna di request object
    req.user = user;
    next();
  });
};
