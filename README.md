# nodejs-api

A simple Node.js API project.

## Project Structure

```
.gitignore
package.json
README.md
src/
├── index.js
├── controllers/
│   └── sampleController.js
├── middleware/
│   └── errorHandler.js
└── routes/
    └── index.js
```

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd nodejs-api
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the API

```bash
npm start
```

The API will start on port 3000 (or the port specified in `src/index.js`).

## API Endpoints

*   `GET /api/sample` - Returns a sample JSON response.

## Error Handling

Basic error handling middleware is included to catch errors and return a JSON response with status code and message.
