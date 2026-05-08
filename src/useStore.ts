import { useState, useEffect } from 'react';
import { store } from './store';

function getSnapshot() {
  return {
    products: store.products,
    cart: store.cart,
    heroSettings: store.heroSettings,
    siteSettings: store.siteSettings,
    categories: store.categories,
    cartTotal: store.getCartTotal(),
    cartCount: store.getCartCount(),
  };
}

export function useStore() {
  const [state, setState] = useState(getSnapshot);

  useEffect(() => {
    return store.subscribe(() => {
      setState(getSnapshot());
    });
  }, []);

  return state;
}
