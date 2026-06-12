import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const MIME: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
};

function safeJoinUploads(segments: string[]) {
    const rel = segments.join("/");
    if (rel.includes("..")) throw new Error("Forbidden");
    return path.join(process.cwd(), "public", "uploads", rel);
}

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> },
) {
    try {
        const { path: pieces } = await params;
        const abs = safeJoinUploads(pieces);

        const stat = await fs.stat(abs);
        if (!stat.isFile()) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 });
        }

        const ext = path.extname(abs).toLowerCase();
        const mime = MIME[ext] ?? "application/octet-stream";
        const file = await fs.readFile(abs);
        const body = new Uint8Array(file);

        return new NextResponse(body, {
            status: 200,
            headers: {
                "Content-Type": mime,
                "Content-Length": String(body.byteLength),
                "Cache-Control": "no-store",
                "Last-Modified": stat.mtime.toUTCString(),
            },
        });
    } catch {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
}
