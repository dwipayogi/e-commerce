export interface Product {
  id: number
  name: string
  price: number
  image: string
}

export interface CartItem extends Product {
  quantity: number
}

export function addToCart(product: Product) {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
  const existingItem = cart.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
}

export function removeFromCart(id: number) {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
  const updatedCart = cart.filter((item) => item.id !== id)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
}

export function updateCartItemQuantity(id: number, quantity: number) {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
  const updatedCart = cart
    .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
    .filter((item) => item.quantity > 0)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
}

export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") || "[]")
}

export function clearCart() {
  localStorage.removeItem("cart")
}

export function getCartTotal(): number {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

