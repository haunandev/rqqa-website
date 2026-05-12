/**
 * API Debug Utilities
 * Membantu diagnosa masalah koneksi ke Strapi
 */

export async function testStrapiConnection(): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const token = process.env.STRAPI_API_TOKEN;

  console.log("🔍 Testing Strapi Connection...");
  console.log(`Base URL: ${baseUrl}`);
  console.log(
    `API Token: ${token ? token.substring(0, 10) + "..." : "NOT SET"}`,
  );

  try {
    // Test basic connection
    const connectionTest = await fetch(`${baseUrl}/api/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    console.log(`Response Status: ${connectionTest.status}`);

    const responseText = await connectionTest.text();
    console.log(`Response Preview: ${responseText.substring(0, 200)}`);

    if (!connectionTest.ok) {
      return {
        success: false,
        message: `Strapi API returned error: ${connectionTest.status}`,
        details: {
          status: connectionTest.status,
          statusText: connectionTest.statusText,
          response: responseText,
        },
      };
    }

    const data = JSON.parse(responseText);
    return {
      success: true,
      message: `✅ Connected to Strapi successfully`,
      details: {
        articlesCount: data?.data?.length || 0,
        data: data,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `❌ Failed to connect to Strapi: ${error instanceof Error ? error.message : String(error)}`,
      details: {
        error: error instanceof Error ? error.message : String(error),
      },
    };
  }
}
