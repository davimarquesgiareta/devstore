import { z } from "zod";
import data from "../data.json";

export async function GET(request: Request, context: { params: { slug: string } }) {
  const { slug } = await context.params; // <- isso causa o erro atual

  // Correto:
  const parsedSlug = z.string().parse(slug);

  const product = data.products.find((product) => product.slug === parsedSlug);

  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 400 });
  }

  return Response.json(product);
}
