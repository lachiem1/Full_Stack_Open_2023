```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: 302 status code (URL redirect, server asks browser to make new HTTP GET request to /exampleapp/notes)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: 304 status code - causes browser to send 3 more HTTP requests
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: 304 status code - returns the CSS file (main.css) for styling the page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: 304 status code - returns the JavaScript file (main.js)
    deactivate server

    Note right of browser: browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: 200 status code - [{"content": "check", "date": "2023-06-24T03:55:48.770Z"}, ...]
    deactivate server

    Note right of browser: browser executes  callback function that renders the notes