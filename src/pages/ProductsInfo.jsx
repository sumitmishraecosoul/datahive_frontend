import React from "react";

const ProductsInfo = () => {
    // Example data, replace with real data or fetch from API
    const products = [
        {
            id: 1,
            name: "Eco-Friendly Plate",
            description: "Biodegradable plate made from natural materials.",
            price: "$2.99",
            stock: 120,
        },
        {
            id: 2,
            name: "Reusable Straw",
            description: "Stainless steel straw with cleaning brush.",
            price: "$1.49",
            stock: 300,
        },
        {
            id: 3,
            name: "Bamboo Toothbrush",
            description: "Sustainable bamboo toothbrush for daily use.",
            price: "$0.99",
            stock: 200,
        },
    ];

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Products Information</h1>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.name}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.description}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.price}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsInfo;