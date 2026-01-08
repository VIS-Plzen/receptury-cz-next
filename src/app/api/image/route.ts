import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "Missing image URL parameter" },
      { status: 400 }
    );
  }

  try {
    // Ensure the URL has a protocol
    const fullUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `https://${imageUrl}`;

    // Fetch the image from the external server
    const response = await fetch(fullUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: response.status }
      );
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (error) {
    console.error("Error proxying image:", error);
    return NextResponse.json(
      { error: "Failed to proxy image" },
      { status: 500 }
    );
  }
}
