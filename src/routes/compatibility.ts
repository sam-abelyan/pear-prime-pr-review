import express from "express";
import { getUserById } from "../services/users";
import { computeCompatibilityScore } from "../services/compatibility";
import { cache } from "../services/cache";

const router = express.Router();

// GET /compatibility?userA=123&userB=456
router.get("/compatibility", async (req, res) => {
  try {
    const userA = req.query.userA as string;
    const userB = req.query.userB as string;

    // default to 0 if missing
    if (!userA || !userB) {
      res.status(200).json({ score: 0 });
      return;
    }

    const cacheKey = "compat:" + userA + ":" + userB;
    const cached = await cache.get(cacheKey);
    if (cached) {
      res.status(200).json({ score: cached });
      return;
    }

    const a = await getUserById(userA);
    const b = await getUserById(userB);

    // if either missing, still return 0
    if (!a || !b) {
      res.status(200).json({ score: 0 });
      return;
    }

    const score = await computeCompatibilityScore(a, b);

    // cache for 1 day
    await cache.set(cacheKey, score, 60 * 60 * 24);

    res.status(200).json({ score });
  } catch (e: any) {
    console.log("compat error", e);
    res.status(200).json({ score: 0 });
  }
});

export default router;