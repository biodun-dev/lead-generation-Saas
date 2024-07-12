require("dotenv").config();
import { validateEnv } from "./utils/validateEnv"; // Use named import
import app from "./app"; // Import the Express app

// Validate environment variables
validateEnv();

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
