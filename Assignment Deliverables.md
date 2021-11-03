# Chainanalysis Software Engineer, University Grad Assignment

`Author: Justin Xu`

## Github Links

- React Web Application: https://github.com/justinxu2014/crypto-advisor-web
- Express/ Node.js API: https://github.com/justinxu2014/crypto-advisor-api

## Build Instructions

- Build Instructions can be found in the README for each repository.

## Questionaire

1. Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?

   - In the app, state variables are manually coded in to store price and recommendation data. This is ok for tracking a small defined number of exchanges and cryptocurrencies but becomes impractical when datasets grow.

   - Logging is implemented with console.log().

2. Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)

   - This application is pretty simple in its implementation. It aggregates streams from different crypto exchanges in to a single stream that clients can subscribe to.

3. If you have to scale your solution to 100 users/second traffic what changes would you make, if any?

   - In my current implementation, over 60 thousand concurrent websocket connections are supported on 1 heroku free tier dyno.
   - For future scaling, I can scale horizontally by creating multiple server instances and directing clients to the optimal server using a service discovery solution.

4. What are some other enhancements you would have made, if you had more time to do this implementation

   - Front-end
     - Update styling to provide a better user experience.
   - Back-end
     - Basic authentication for connection with backend.
     - Refactor logging to utilize a logging library such as Winston.
     - Ability to sub to individual tickers.
     - Add support for additional exchanges.

## Live Web Application

React Web Application: https://crypto-advisor.netlify.app/
