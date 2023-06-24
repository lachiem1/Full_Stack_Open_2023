```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 status code - this post request contains new note as JSON data, containing the new content and date

    Note right of browser: for single page app, server does not ask for redirect. Browser stays on same page.