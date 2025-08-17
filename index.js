import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;

app.get("/proxy", async (req, res) => {
  const fileUrl = req.query.url;
  if (!fileUrl) return res.status(400).send("Falta ?url=...");
  
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error("Error descargando el archivo: " + response);
    
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    res.setHeader("Content-Disposition", "attachment; filename=archivo.dat");
    
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
