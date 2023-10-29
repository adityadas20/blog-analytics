# blog-analytics
Backend for a blog analytics and search tool using Node.js, Express.js, and Lodash. The goal is to create a middleware that analyzes the data retrieved from a third-party blog API and provides insightful statistics to clients.

Uses:
1. Data Retrieval:

> Using Express.js to create a route at `/api/blog-stats`
>
> When a GET request is made to this route, the middleware makes the provided curl request to fetch the blog data.

2. Caching mechanism:
 
> Caching mechanism using Lodash's `memoize` function to store the analytics results and search results. If the same requests are made within the caching period, return the cached results instead of re-fetching and re-analyzing the data.

3.  Data Analysis (response):
   
> After fetching the data, using Lodash to perform the following analytics:
> 
> Calculate the total number of blogs fetched.
> 
> Find the blog with the longest title.
> 
> Determine the number of blogs with titles containing the word "privacy."
> 
> Create an array of unique blog titles.

4. Blog Search Endpoint:
   
> Additional route at `/api/blog-search`
>
> This route accepts a query parameter, e.g., `/api/blog-search?query=privacy`
>
> Functionality that filters the blogs based on the provided query string (case-insensitive).

5. Error Handling:

> Handle any errors that may occur during the data retrieval, analysis, or search process. If the third-party API is unavailable or returns an error, respond with an appropriate error message.

Impact:

> Using such a middleware brings down the total time required to fetch the data and analyze the required details.
> Previously:
>![image](https://github.com/adityadas20/blog-analytics/assets/72307222/f9963ee4-80c9-4738-84cd-503299c64acd)

> Using similar middleware:
> ![image](https://github.com/adityadas20/blog-analytics/assets/72307222/1793b9b2-5992-405a-965e-e3ece8f64b47)

