import { NextResponse } from "next/server";

export function GET() {
	return NextResponse.redirect(new URL("https://discord.gg/ZJ8CctHuCT"));
}
