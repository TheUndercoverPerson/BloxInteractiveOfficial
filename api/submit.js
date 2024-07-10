const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lxcurmtuzlwxszbutxhk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4Y3VybXR1emx3eHN6YnV0eGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0NDk1ODksImV4cCI6MjAzNjAyNTU4OX0.RtHEpLhoDZ_jtv3K46vcogreTyXe3YWTHec0aiq76oM';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

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
};
