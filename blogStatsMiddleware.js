const axios = require('axios');
const _ = require('lodash');

// using Lodash's `memoize` function to cache the blogs instead of making the get request again and again 
// reference docs: https://lodash.com/docs/4.17.15#memoize https://www.geeksforgeeks.org/lodash-_-memoize-method/
const memoizeBlogStats = _.memoize(async () => {
    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
            }
        });
        return response;
    } catch (error) {
        console.error("Internal server error: ", error);
        return { error: 'An error occurred while fetching and analyzing blog data.' };
    }
});


// Middleware function to fetch all blogs
const blogStatsMiddleware = async (req, res, next) => {
    try {
        const response = await memoizeBlogStats();
        if (response.error)
            throw new Error(response.error);

        const blogData = response.data.blogs;
        req.blogData = blogData;

        next();
    } catch (error) {
        console.error("Internal server error: ", error);
        res.status(500).json({ error: 'An error occurred while fetching and analyzing blog data.' });
    }
};

module.exports = blogStatsMiddleware;