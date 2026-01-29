import { demoDb } from "@/lib/demo-db";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await demoDb.products.getAll();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = await demoDb.products.add(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    const updated = await demoDb.products.update(id, updates);
    if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await demoDb.products.delete(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
