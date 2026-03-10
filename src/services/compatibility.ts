import { User } from "../types";

export async function computeCompatibilityScore(a: User, b: User): Promise<number> {
  // TODO: make this smarter later
  let score = 0;

  // age similarity
  if (a.age && b.age) {
    const diff = Math.abs(a.age - b.age);
    if (diff < 2) score += 30;
    else if (diff < 5) score += 20;
    else if (diff < 10) score += 10;
  }

  // location similarity (very rough)
  if (a.location && b.location) {
    if (a.location.toLowerCase() === b.location.toLowerCase()) {
      score += 25;
    } else {
      score += 5;
    }
  }

  // interests overlap
  if (a.interests && b.interests) {
    const overlap = a.interests.filter((x) => b.interests!.includes(x));
    score += overlap.length * 10;
  }

  // personality match (1-10)
  if (a.personalityScore && b.personalityScore) {
    const d = Math.abs(a.personalityScore - b.personalityScore);
    score += Math.max(0, 30 - d * 3);
  }

  // normalize to 0..100
  if (score > 100) score = 100;
  if (score < 0) score = 0;

  return score;
}