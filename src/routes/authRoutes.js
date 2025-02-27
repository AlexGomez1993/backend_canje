const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, async (err, users) => {
        if (err || users.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Credenciales inválidas' });

        const token = jwt.sign({ id: user.id, rol_id: user.rol_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
