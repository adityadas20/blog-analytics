const express = require('express');
const _ = require('lodash');
const blogStatsMiddleware = require('./blogStatsMiddleware');
const app = express();

// middleware
app.use('/api', blogStatsMiddleware);

// routes
app.get('/api/blog-stats', _.memoize(async (req, res) => {
    try {
        const blogData = req.blogData;
        const blogCount = blogData.length;
        const longestBlogTitle = (_.maxBy(blogData, (blog) => blog.title.length)).title;  // returns the blog object which has the longest title length, hence we do .title later on so we get only the title
        const privacyBlogsCount = (_.filter(blogData, (blog) => blog.title.toLowerCase().includes('privacy'))).length; // we just want the count of blogs with titles containing the word "privacy" hence we do .length at last
        const uniqueTitles = _.uniqBy(blogData, 'title');

        const stats = {
            blogCount,
            longestBlogTitle,
            privacyBlogsCount,
            uniqueBlogTitles: uniqueTitles.map((blog) => blog.title),
        };
        res.json(stats);
    } catch (error) {
        console.error("Internal server error: ", error);
        res.status(500).json({ error: 'An error occurred while fetching and analyzing blog data.' });
    }
}));

app.get('/api/blog-search', _.memoize((req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is missing' });
        }

        const blogData = req.blogData;
        const matchingBlogs = blogData.filter((blog) => blog.title.toLowerCase().includes(query.toLowerCase()));
        res.json(matchingBlogs);
    } catch (error) {
        console.error("Internal server error: ", error);
        res.status(500).json({ error: 'An error occurred while fetching and analyzing blog data.' });
    }
}));

// server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
