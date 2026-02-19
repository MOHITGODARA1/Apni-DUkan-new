const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        const adminExists = await User.findOne({ email: 'admin@apnidukan.com' });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const adminUser = {
            name: 'Admin User',
            email: 'admin@apnidukan.com',
            password: hashedPassword,
            role: 'admin',
            phone: '9876543210',
            isVerified: true
        };

        await User.create(adminUser);

        console.log('Admin User Created Successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
