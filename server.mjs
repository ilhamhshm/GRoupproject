import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const formData = req.body; // Extract form data

    console.log('Form data received:', formData); // For debugging

    // Check if message.json exists
    if (!fs.existsSync('message.json')) {
        fs.writeFileSync('message.json', '[]'); // Create an empty JSON file
    }

    // Read and update the JSON file
    fs.readFile('message.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Server error');
        }

        let users = JSON.parse(data); // Parse existing data
        users.push(formData); // Add new form data

        // Write back to message.json
        fs.writeFile('message.json', JSON.stringify(users, null, 2), err => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Server error');
            }

            res.send('Form submitted successfully and data saved!');
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});