const express = require('express');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/edugrow', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define User model
// const UserSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// });

// const User = mongoose.model('User', UserSchema);

// // JWT secret
// const JWT_SECRET = 'your_jwt_secret_key';

// // Login route
// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Generate JWT
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token });
// });

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
