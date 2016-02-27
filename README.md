
# ES6 Single Page App
## Synopsis
ES6 single page application boilerplate without a framework.
## Motivation
Right now, many developers are just curious about ES6 and how it fits into a SPA. The author recommends that they map their knowledge about ES5 object prototypes to ES6 class syntax concepts before trying to reap the benefits of modern rich web app. This approach is relatively new and therefore does not have many great technical references available yet. Many have begun applying this architecture principles to the development of complex web applications and are rapidly building a solid set of best practices based on real world experiences. A solid set of best practices will minimise the effords needed to build an ES6 SPA, while also helping developers identify anti-patterns. This project highlights several best practices that should point out the path to rich client application development.
## Features
This app features best practices in the following areas:

1. Flexible single page app architecture based on ES6 rigid class inheritance hierarchies

  This architecture allows extension of the traditional request response model the classic web is built upon. Only a single page is requested from the server on the initial load and all other subsequent views (similar to traditional pages) are taken in and out of view as needed. Single Page architecture built upon ES6 class inheritance enables createtion of new classes that reuse, extend, and modify the behavior that is defined in other classes. The architecture also relies heavily upon ES6 module loader to pass information to and from the server to the client to merge with views that present data. This approach provides much less network activity, faster responses to user interactions and smaller server loads.

2. Secure token based authentication

  Successful token authentication system requires us to have detailed knowledge of security vulnerabilities and possible pitfalls associated with them. Single page app tend to have a complex structure: logged in view, the logged out view, or the restricted view. A basic example of this is when a user navigates to an app home address, based on if he is logged in or not, he is served with an account or login view content under the same url. It all comes down to access control. Users get the same app but they may not have the same levels of access. Csurf REST API session tokens presented in this app are great authentication mechanism with a solid secure layer that help us define who a user is and what they can access. 
  
3. Isomorphic application logic that allows the same snippets of code to run both in the server and the client

  The concept of isomorphic application is usually sold as a high performance solution for loading time in single page applications. However it actually fixes the problems introduced by SPA concept. A SPA that does not render on the server (isn’t isomorphic) doesn’t just degrade when javascript doesn’t work, it’s totally broken. This leads us to the conclusion that isomorphic javascript is just progressive enhancement done the proper way. We always serve up a usable page with core level functionality, while progressively enhancing with javascript. Search crawler receives the full page as well as a regular user. The whole state of the application is restored from URL.
