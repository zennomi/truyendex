import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(req: Request) {
  const origin = req.headers.get("origin");

  if (!origin)
    return NextResponse.json({ error: "Origin not found" }, { status: 400 });

  const source = detectOrigin(origin);

  if (!source)
    return new NextResponse(
      `alert("TruyenDex hiện chỉ hỗ trợ đồng bộ từ các nguồn MangaDex, CManga, CuuTruyen!")`,
      {
        headers: noCorsHeaders,
      },
    );

  const hostname = req.headers.get("host");

  const commonFilePath = path.join(
    process.cwd(),
    "public",
    "js",
    "sync",
    "common.js",
  );

  const sourceFilePath = path.join(
    process.cwd(),
    "public",
    "js",
    "sync",
    `${source}.js`,
  );

  let commonFileBuffer = await fs.readFile(commonFilePath, "utf-8");

  const sourceFileBuffer = await fs.readFile(sourceFilePath, "utf-8");

  commonFileBuffer = commonFileBuffer.replace(
    "http://localhost:3000",
    `https://${hostname}`,
  );

  const mergedContent = `${commonFileBuffer}\n${sourceFileBuffer}`;

  return new NextResponse(mergedContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": 'inline; filename="merged.txt"',
      ...noCorsHeaders,
    },
  });
}

const noCorsHeaders = {
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
};

function detectOrigin(
  origin: string,
): "mangadex" | "cuutruyen" | "cmanga" | null {
  if (origin === "https://mangadex.org") {
    return "mangadex";
  }

  if (origin === "https://nettrom.com") {
    return "cuutruyen";
  }

  if (origin.includes("cuutruyen")) return "cuutruyen";

  if (origin.includes("cmanga")) return "cmanga";

  return null;
}
