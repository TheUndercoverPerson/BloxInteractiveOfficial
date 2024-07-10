const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lxcurmtuzlwxszbutxhk.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
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
