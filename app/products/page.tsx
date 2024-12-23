import ProductList from "../ProductList"

export default async function ProductsPage() {
  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/products');
  const products = await response.json();

  const resoponse2 = await fetch(process.env.NEXT_PUBLIC_SITE_URL +'/api/user/2/cart',{
    cache: 'no-cache'
  });
  const cartProducts = await resoponse2.json();
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <ProductList products={products} initialCartProducts={cartProducts}/>
  </div>
)
}