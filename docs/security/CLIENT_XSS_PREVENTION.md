# Client-Side XSS Prevention Guidelines

- React JSX automatic string escaping on all user-supplied text.
- No direct `dangerouslySetInnerHTML` usage.
- Strict Content-Security-Policy script restriction headers.
