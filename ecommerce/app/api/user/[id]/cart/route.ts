import { NextRequest } from "next/server";
import { products } from "@/app/product-data";
import { connectToDb } from "@/app/api/db";

type Params = {
  id: string;
};
type ShoppingCart = Record<string, string[]>;

const cart: ShoppingCart = {
  "1": ["123", "234"],
  "2": ["345", "456"],
  "3": ["123"],
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { db } = await connectToDb();
  const { id: userId } = await params;
  const userCart = await db.collection("carts").findOne({ userId });

  if (!userCart) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        "Contect-Type": "application/json",
      },
    });
  }

  const cartIds = userCart.cartIds;

  // find id that is in cartids array
  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: cartIds } })
    .toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 200,
    headers: {
      "Contect-Type": "application/json",
    },
  });
}

type CartBody = {
  productId: string;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { db } = await connectToDb();
  const { id: userId } = await params;
  const body: CartBody = await request.json();
  const productId = body.productId;

  const updatedCart = await db
    .collection("carts")
    .findOneAndUpdate(
      { userId },
      { $push: { cartIds: productId } },
      { upsert: true, returnDocument: "after" }
    );

  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: updatedCart.cartIds } })
    .toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { db } = await connectToDb();
  const { id: userId } = await params;
  const body: ShoppingCart = await request.json();
  const productId = body.productId;

  const updatedCart = await db
    .collection("carts")
    .findOneAndUpdate(
      { userId },
      { $pull: { cartIds: productId } },
      { returnDocument: "after" }
    );

  if (!updatedCart) {
    return new Response(JSON.stringify([]), {
      status: 202,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: updatedCart.cartIds } })
    .toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 202,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
