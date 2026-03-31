const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send("Toon4u API is Online! Use /anime/trending for data.");
});

// Trending Anime ka Naya aur Mazboot Rasta
app.get('/anime/trending', async (req, res) => {
    try {
        // Hum "Anilist" ka trending data utha rahe hain jo sabse best hai
        const response = await axios.get('https://api.consumet.org/meta/anilist/trending');
        res.json(response.data);
    } catch (error) {
        // Agar pehla fail ho jaye, to doosra rasta (Backup)
        try {
            const backup = await axios.get('https://api.amvstr.me/api/v2/trending');
            res.json(backup.data);
        } catch (err) {
            res.status(500).json({ error: "Sare sources down hain, thori der baad check karein." });
        }
    }
});

module.exports = app;
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on ${port}`));
