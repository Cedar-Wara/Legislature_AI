import express from "express";
import axios from "axios";
import dotenv from "dotenv";
// test
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = "https://api.legiscan.com/";

app.get("/api/bill/:id", async (req, res) => {
    try {
        const billId = req.params.id;
        const response = await axios.get(BASE_URL, {
            params: {
                key: process.env.LEGISCAN_API_KEY,
                op: "getBill",
                id: billId,
            },
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch bill data" });
    }
});

app.get("/api/search/:term", async (req, res) => {
    try {
        const { term } = req.params;
        const response = await axios.get(BASE_URL, {
            params: {
                key: process.env.LEGISCAN_API_KEY,
                op: "getSearch",
                state: "CA",
                query: term,
            },
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Search failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
