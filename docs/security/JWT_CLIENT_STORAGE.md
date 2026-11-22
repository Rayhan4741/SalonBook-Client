# Client-Side JWT and Session Storage

- Tokens are stored in secure browser local storage and cookie headers.
- Axios interceptor automatically attaches `Authorization: Bearer <token>` to every API request.
- 401 Unauthorized responses trigger automatic redirect to `/sign-in`.
