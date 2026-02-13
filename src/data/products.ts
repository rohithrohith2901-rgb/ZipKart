export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    weight: string;
    image: string;
    category: string;
}

import productsData from './products.json';

export const products: Product[] = productsData;

export const categories = [
    { id: "all", name: "All", icon: "LayoutGrid" },
    { id: "Fruits & Vegetables", name: "Fruits & Vegetables", icon: "Carrot" },
    { id: "Dairy, Bread & Eggs", name: "Dairy, Bread & Eggs", icon: "Milk" },
    { id: "Snacks & Munchies", name: "Snacks & Munchies", icon: "Cookie" },
    { id: "Cold Drinks", name: "Cold Drinks", icon: "CupSoda" },
    { id: "Household Needs", name: "Household Needs", icon: "Home" },
    { id: "Personal Care", name: "Personal Care", icon: "SprayCan" },
];
