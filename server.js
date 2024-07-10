const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).send('Username is required');
    }

    try {
        const { data, error } = await supabase
            .from('api_keys')
            .insert([{ user_requesting: username }]);

        if (error) {
            throw error;
        }

        res.status(200).send('Username submitted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Failed to submit username');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
