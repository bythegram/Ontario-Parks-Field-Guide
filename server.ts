import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Strava OAuth Routes
  app.get("/api/auth/strava/url", (req, res) => {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const redirectUri = `${process.env.APP_URL}/auth/strava/callback`;
    
    if (!clientId) {
      return res.status(500).json({ error: "STRAVA_CLIENT_ID not configured" });
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "read,activity:read_all",
      approval_prompt: "auto"
    });

    res.json({ url: `https://www.strava.com/oauth/authorize?${params.toString()}` });
  });

  app.get("/auth/strava/callback", async (req, res) => {
    const { code } = req.query;
    
    // In a real app, we'd exchange the code here and store the token.
    // Since we're "Local storage only", we'll send the code back to the client
    // or ideally do the exchange here and send the tokens back.
    
    try {
      const response = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: process.env.STRAVA_CLIENT_ID,
          client_secret: process.env.STRAVA_CLIENT_SECRET,
          code,
          grant_type: "authorization_code",
        }),
      });

      const data = await response.json();
      
      // Pass tokens back to client via postMessage
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ 
                  type: 'STRAVA_AUTH_SUCCESS',
                  payload: ${JSON.stringify(data)}
                }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. You can close this window.</p>
          </body>
        </html>
      `);
    } catch (error) {
      res.status(500).send("Failed to exchange Strava token");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
