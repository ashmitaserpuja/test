Overview

This solution uses React, react-router-dom, react-window, and context API for state management to construct an effective and easy-to-use item listing and detail browsing capability. It consists of:

-Virtualised list of goods with pages
-Search abilities with regulated inputs
-Lazy-loaded detail page per item
-Graceful loading and fallback UI
-The backend logic is fully unit-tested using Jest. 

Approach

1. Pagination & Virtualization
react-window is used for virtual rendering of item rows, reducing DOM overhead on large datasets.
By manually managing pagination to retrieve just needed chunks, API load is decreased and performance is enhanced.

2. Search Implementation
Search state is handled via useState.
When the search input changes, we: Reset the page to 1; 
Trigger fetchItems with the new query
This keeps UX simple while maintaining fast rendering.

3. Error Handling
In ItemDetail, if fetch fails, the user is redirected back to / using navigate('/') which already exist in the code.
Skeleton loaders simulate loading UX and prevent layout shift.

4. Styling
Used inline styles for simplicity and clarity in a small project, avoiding the overhead of CSS modules or external frameworks. Could be replaced with Tailwind or styled-components for scalability.


Testing
Backend logic is fully unit-tested using Jest, focusing on:

-API endpoint responses
-Data fetching and transformation logic
-Error handling and edge cases
-Pagination and search processing on the server side

Right now, the frontend components don't have tests, but they're built in a way that makes it easy to add React Testing Library later for UI and interaction testing

Trade-Offs

| Decision                  | Pros                                   | Cons                                                     |
| ------------------------- | -------------------------------------- | -------------------------------------------------------- |
| Using `react-window`      | Great for performance with large lists | Adds complexity for small lists                          |
| Inline styling            | Fast and simple                        | Harder to maintain in large apps                         |
| Global context for data   | Centralized logic                      | May need Redux/Zustand for more control                  |
| Manual fetch & pagination | Full control and efficiency            | More boilerplate than using libraries like `react-query` |
| Skeleton loaders          | Better UX during fetch                 | Adds minor visual code complexity                        |




