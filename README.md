Commit Details Component

The CommitDetails component is a React component designed to display commit details and the associated commit diff for a specific commit SHA in a GitHub repository.

Features:

    Fetches commit details and updates from a backend server.
    Displays commit message, author details, commit metadata.
    Renders commit diff with added lines in green, removed lines in red, and unchanged lines in neutral color.
    Allows collapsing/expanding of file diffs.

Installation

   Clone the repository:
   
     git clone https://github.com/shtewari23/commit-changes/tree/main
     Run two terminals - One for frontend and one for backend
     cd frontend
     cd backend

   Install dependencies:

    # Install frontend dependencies
    cd frontend
    npm install

    # Install backend dependencies
    cd backend
    npm install

Configure Backend:

    Ensure the backend server (localhost:5000 assumed) is running and accessible.
    Modify backend URLs in CommitDetails.js as per your setup.

    Start the backend application:
    # From the backend directory
    node server.js
    # Makes sure you are running the command inside the backend directory , if you want to move to backend directory try using cd backend


Configure Front-End:

   
    Start the frontend application:
    # From the frontend directory
    cd frontend
    npm start
    # Makes sure you are running the command inside the frontend directory , if you want to move to frontend directory try using cd frontend


    Open your browser and navigate to http://localhost:3000 to view the application.
    


Technologies Used

    Frontend:
        React.js
        Axios for HTTP requests
        React Router DOM for routing

    Backend:
        Express.js (assumed from the backend implementation)



    Navigate to http://localhost:3000/repositories/:owner/:repository/commit/:commitSHA to view details of a specific commit.

Code Explanation

  
   Frontend Code Explanation
     
         The frontend code is implemented using React to create a CommitDetails component that fetches and displays details of a specific commit from a GitHub repository,       including the commit message, author details, commit metadata, and the commit diff. Here’s an explanation of the key parts of the code:
     CommitDetails Component

    State Management:
        useState hooks are used to manage state variables:
            commit: Stores the fetched commit details.
            diff: Stores the fetched commit diff details.
            loading: Boolean state to indicate if data is being fetched.
            error: Stores error message if data fetching fails.

    Fetching Data (useEffect):
        The useEffect hook is used to fetch commit details (commitDetailsResponse) and commit diff (diffResponse) when the component mounts. It triggers the fetch operation based on changes in owner, repository, and commitSHA.
        Axios is used for making HTTP GET requests to fetch data from the backend server (localhost:5000 assumed).

    Toggle Collapse:
        toggleCollapse function toggles the collapsed state of file diffs within the commit diff view. It updates the diff state to reflect the toggled state.

    Rendering Commit Details and Diff:
        The renderFileDiffs function maps over the diff.files array to render each file diff. It displays file headers and content, with lines styled based on whether they are added, removed, or unchanged.

    Conditional Rendering:
        The component conditionally renders loading indicator (Loading...), error message (Error: ...), commit details (commit-header), and commit diff (diff-container) based on the state (loading, error, commit, diff).

    Styling:
        The component uses a separate CSS file (CommitDetails.css) for styling. It defines styles for commit headers, file diffs, line numbers, and various UI elements to resemble a GitHub commit page.

  Backend Code Explanation

     The backend code is implemented using Express.js to serve as a middleware API server that interacts with the GitHub API to fetch commit details and commit diffs.       Here’s an explanation of the key parts of the code:
     server.js (Backend)

    Dependencies:
        express: Framework for building Node.js applications.
        axios: Promise-based HTTP client for making HTTP requests.
        cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
        dotenv: Loads environment variables from a .env file.

    Setup:
        Express app is initialized (const app = express();).
        Port number (port) is defined, fallback to 5000 if not specified in environment variables.
        GitHub API token (githubApiToken) is loaded from environment variables using dotenv.

    Middleware:
        cors() middleware is used to enable CORS for all routes (app.use(cors());).
        express.json() middleware is used to parse incoming JSON payloads.

    Routes:

        GET /repositories/:owner/:repo/commits/:commitSHA:
            Fetches commit details for a specific commit (commitSHA) in a GitHub repository (owner, repo).
            Uses GitHub API with authentication using the githubApiToken.
            Returns fetched commit details as JSON response.

        GET /repositories/:owner/:repo/commits/:commitSHA/diff:
            Fetches the commit diff for changes made in a specific commit (commitSHA) in a GitHub repository (owner, repo).
            Uses GitHub API to compare the commit with its parent (commitSHA^...commitSHA).
            Returns fetched commit diff as JSON response.

    Error Handling:
        Catches and logs errors during data fetching from GitHub API.
        Returns appropriate HTTP status codes (500 for server errors) and error messages (Failed to fetch commit details or Failed to fetch commit diff) in JSON format.

    Start Server:
        Starts the Express server to listen on the defined port (port).

 Known Limitations and Trade-offs :

    Backend Dependency:
        Limitation: The solution heavily relies on a backend server (localhost:5000 assumed) to fetch commit details and diff data. This introduces a dependency on the backend's availability and performance.
        Trade-off: By using a backend server, the application can delegate heavy lifting tasks like data fetching and processing, ensuring better separation of concerns and scalability. However, it adds complexity in terms of deployment and maintenance.

    API Response Structure:
        Limitation: The frontend assumes a specific structure and format for the API responses (commitDetailsResponse.data and diffResponse.data). Any deviation from this structure could lead to errors or unexpected behavior.
        Trade-off: By relying on a consistent API response structure, the frontend can efficiently parse and display data without needing to handle various edge cases. However, it requires clear communication and coordination between frontend and backend teams.

Potential Enhancements :

    Pagination or Lazy Loading for Large Diffs:
        Implement pagination or lazy loading mechanisms for diff files and lines to handle large commits with extensive changes efficiently. This would prevent performance degradation and enhance user experience.

    Search and Highlight Functionality:
        Add search functionality within the diff view to allow users to find specific lines or changes easily. Implement highlighting to visually indicate search results.

    Diff View Options:
        Provide options to toggle between unified and split view modes for diffs, allowing users to choose their preferred diff presentation style.

    Interactive File Tree:
        Introduce an interactive file tree component that dynamically loads and displays files changed in the commit. This enhances navigation and provides a clearer overview of changes.

![Capture](https://github.com/shtewari23/commit-changes/assets/80051211/898f4a6f-cbfa-403a-ade0-d1bdab4a9643)
![Capture](https://github.com/shtewari23/commit-changes/assets/80051211/42b7faa2-eec7-4f3e-a55d-d13a1ae2d07c)
