export async function GET(req: Request) {
  try {
    return Response.json({ code: 200, test: "ok" }, { status: 200 });
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    return Response.json({ code: 201, test: "ok" }, { status: 201 });
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}
