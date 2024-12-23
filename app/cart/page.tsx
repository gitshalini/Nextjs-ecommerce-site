import ShoppingCartList from "./shoppingCartList";

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL +'/api/user/2/cart',{
    cache: 'no-cache'
  });
  const cartProducts = await response.json();
  return(
    <ShoppingCartList initialCartProducts={cartProducts}/> 
  )
}