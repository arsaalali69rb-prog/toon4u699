const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Is se aapki website block nahi hogi

// Main Page Check
app.get('/', (req, res) => {
    res.send("Toon4u API is Live! Posters are loading...");
});

// Trending Anime Route (Posters ke liye)
app.get('/anime/trending', async (req, res) => {
    try {
        const response = await axios.get('https://api.amvstr.me/api/v2/trending');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Data fetch nahi ho raha" });
    }
});

// Search Anime Route
app.get('/anime/search', async (req, res) => {
    const query = req.query.q;
    try {
        const response = await axios.get(`https://api.amvstr.me/api/v2/search?q=${query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Search fail ho gaya" });
    }
});

module.exports = app;
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
