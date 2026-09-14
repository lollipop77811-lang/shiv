/**
 * Task: re-render the eye-exam photo on a flat chroma-key green background so
 * the subjects can be cut out cleanly (the original has a white machine on a
 * white wall — direct background removal fails).
 * Source: upload/Eye_exam_machines_..._hero-1024x672.webp
 * Output: public/images/hero-exam-green.png
 */
import fs from "fs";
import ZAI from "z-ai-web-dev-sdk";

const SRC = "/home/z/my-project/upload/Eye_exam_machines_what_tools_do_optometrists_use_hero-1024x672.webp";
const OUT = "/home/z/my-project/public/images/hero-exam-green.png";

const PROMPT = `Re-render this exact scene onto a completely flat, uniform, pure chroma-key green background (#00FF00). Keep the doctor, the elderly patient and the slit-lamp examination machine exactly as they are — same poses, same clothing, same colours, same device details, same composition. The people and machine together form a clean silhouette against the green. Absolutely no cast shadows, no shadow pockets between the machine parts, no green light spill on the subjects, no wall, no floor, no furniture — only the doctor, the patient and the machine standing against pure flat green.`;

async function main() {
  const zai = await ZAI.create();
  const image = fs.readFileSync(SRC).toString("base64");
  // upstream expects `images` as an array of { url } — data URL works for local files
  const dataUrl = `data:image/webp;base64,${image}`;
  const result = await zai.images.generations.edit({
    prompt: PROMPT,
    images: [{ url: dataUrl }],
    size: "1344x768",
  } as unknown as Parameters<typeof zai.images.generations.edit>[0]);
  const b64 = result.data[0]?.base64;
  if (!b64) throw new Error("image edit returned no data");
  fs.writeFileSync(OUT, Buffer.from(b64, "base64"));
  console.log("green plate written:", OUT, fs.statSync(OUT).size, "bytes");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
