import { NextRequest, NextResponse } from "next/server";

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const address = request.nextUrl.searchParams.get("address");
    const chain = request.nextUrl.searchParams.get("chain") || "eth";

    if (!address) {
      return NextResponse.json(
        { error: "Wallet address is required." },
        { status: 400 }
      );
    }

    if (!MORALIS_API_KEY) {
      return NextResponse.json(
        { error: "Missing MORALIS_API_KEY." },
        { status: 500 }
      );
    }

    const url = `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=${chain}`;

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "X-API-Key": MORALIS_API_KEY,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.message || data?.error || "Moralis request failed." },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected server error.",
      },
      { status: 500 }
    );
  }
}