import React from "react";

const Reports = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Reports</h1>
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="flex-1 bg-blue-100 rounded-lg p-6 flex flex-col items-center">
                        <span className="text-4xl font-semibold text-blue-600">24</span>
                        <span className="mt-2 text-gray-700">Active Reports</span>
                    </div>
                    <div className="flex-1 bg-green-100 rounded-lg p-6 flex flex-col items-center">
                        <span className="text-4xl font-semibold text-green-600">12</span>
                        <span className="mt-2 text-gray-700">Resolved</span>
                    </div>
                    <div className="flex-1 bg-red-100 rounded-lg p-6 flex flex-col items-center">
                        <span className="text-4xl font-semibold text-red-600">3</span>
                        <span className="mt-2 text-gray-700">Critical</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b text-left text-gray-600">Report ID</th>
                                <th className="px-4 py-2 border-b text-left text-gray-600">Title</th>
                                <th className="px-4 py-2 border-b text-left text-gray-600">Status</th>
                                <th className="px-4 py-2 border-b text-left text-gray-600">Date</th>
                                <th className="px-4 py-2 border-b text-left text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Example row */}
                            <tr>
                                <td className="px-4 py-2 border-b">#1001</td>
                                <td className="px-4 py-2 border-b">Monthly Sales</td>
                                <td className="px-4 py-2 border-b">
                                    <span className="inline-block px-2 py-1 text-xs bg-blue-200 text-blue-800 rounded">Active</span>
                                </td>
                                <td className="px-4 py-2 border-b">2024-06-10</td>
                                <td className="px-4 py-2 border-b">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">View</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b">#1002</td>
                                <td className="px-4 py-2 border-b">Inventory Check</td>
                                <td className="px-4 py-2 border-b">
                                    <span className="inline-block px-2 py-1 text-xs bg-green-200 text-green-800 rounded">Resolved</span>
                                </td>
                                <td className="px-4 py-2 border-b">2024-06-08</td>
                                <td className="px-4 py-2 border-b">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">View</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b">#1003</td>
                                <td className="px-4 py-2 border-b">System Error</td>
                                <td className="px-4 py-2 border-b">
                                    <span className="inline-block px-2 py-1 text-xs bg-red-200 text-red-800 rounded">Critical</span>
                                </td>
                                <td className="px-4 py-2 border-b">2024-06-07</td>
                                <td className="px-4 py-2 border-b">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">View</button>
                                </td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;