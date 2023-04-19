import { useEffect, useState } from 'react';
import api from '../api';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
            const response = await api.get('/products');
            setProducts(response.data);
            } catch (error) {
            console.log(error);
            }
        }
    fetchProducts();
    }, []);

    return (
        <div className="flex flex-col items-center bg-slate-200">
            <div className="w-full max-w-screen-lg py-2">
                <div className='w-full flex items-center justify-center text-5xl py-8'>
                    <h1>Products List</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md  overflow-hidden">
                            <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                                <p className="text-gray-700">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ProductList;