const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const githubApiToken = process.env.GITHUB_API_TOKEN;

app.use(cors());

// Middleware to handle JSON parsing
app.use(express.json());

// Routes
app.get('/repositories/:owner/:repo/commits/:commitSHA', async (req, res) => {
    const { owner, repo, commitSHA } = req.params;
    try {
        const commitUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${commitSHA}`;
        const headers = { Authorization: `Bearer ${githubApiToken}` };
        const response = await axios.get(commitUrl, { headers });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching commit details:', error);
        res.status(error.response?.status || 500).json({ error: 'Failed to fetch commit details' });
    }
});

app.get('/repositories/:owner/:repo/commits/:commitSHA/diff', async (req, res) => {
    const { owner, repo, commitSHA } = req.params;
    try {
        const diffUrl = `https://api.github.com/repos/${owner}/${repo}/compare/${commitSHA}^...${commitSHA}`;
        const headers = { Authorization: `Bearer ${githubApiToken}` };
        const response = await axios.get(diffUrl, { headers });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching commit diff:', error);
        res.status(error.response?.status || 500).json({ error: 'Failed to fetch commit diff' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
