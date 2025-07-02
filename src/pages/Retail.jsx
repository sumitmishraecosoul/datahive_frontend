import React from "react";

const Retail = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Retail Dashboard
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-100 rounded-lg p-6 flex flex-col items-center">
                        <span className="text-2xl font-semibold text-blue-700">120</span>
                        <span className="text-gray-600 mt-2">Total Stores</span>
                    </div>
                    <div className="bg-green-100 rounded-lg p-6 flex flex-col items-center">
                        <span className="text-2xl font-semibold text-green-700">4500</span>
                        <span className="text-gray-600 mt-2">Products Sold</span>
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-6 flex flex-col items-center">
                        <span className="text-2xl font-semibold text-yellow-700">$32,000</span>
                        <span className="text-gray-600 mt-2">Revenue</span>
                    </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
                    <table className="min-w-full text-left">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 text-gray-600">Date</th>
                                <th className="py-2 px-4 text-gray-600">Store</th>
                                <th className="py-2 px-4 text-gray-600">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="py-2 px-4">2024-06-01</td>
                                <td className="py-2 px-4">EcoMart</td>
                                <td className="py-2 px-4">$1,200</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">2024-06-02</td>
                                <td className="py-2 px-4">GreenShop</td>
                                <td className="py-2 px-4">$950</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">2024-06-03</td>
                                <td className="py-2 px-4">NatureStore</td>
                                <td className="py-2 px-4">$1,500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Retail;