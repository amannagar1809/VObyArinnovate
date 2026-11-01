export function GET() {
  return Response.json(
    {
      status: "ok",
      service: "virtual-office",
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}