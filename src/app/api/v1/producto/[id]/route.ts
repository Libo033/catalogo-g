export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    return Response.json({ code: 200, test: "ok" }, { status: 200 });
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    return Response.json({ code: 200, test: "ok" }, { status: 200 });
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    return Response.json({ code: 200, test: "ok" }, { status: 200 });
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}
