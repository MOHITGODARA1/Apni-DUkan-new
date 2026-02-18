import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Plus, Search, Edit, Trash2, Filter } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    // Mock data for initial UI
    const mockProducts = [
        { _id: "1", name: "Premium Headphones", category: "Electronics", price: 199.99, stock: 45, status: "Active" },
        { _id: "2", name: "Ergonomic Chair", category: "Furniture", price: 299.00, stock: 12, status: "Active" },
        { _id: "3", name: "Wireless Mouse", category: "Electronics", price: 49.99, stock: 8, status: "Low Stock" },
        { _id: "4", name: "Notebook Set", category: "Stationery", price: 15.00, stock: 100, status: "Active" },
        { _id: "5", name: "Desk Lamp", category: "Furniture", price: 35.50, stock: 0, status: "Out of Stock" },
    ];

    useEffect(() => {
        // In a real app, fetch from API
        // axios.get("/products").then(...)
        setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 500);
    }, []);

    const getStatusBadge = (stock) => {
        if (stock === 0) return <Badge variant="destructive">Out of Stock</Badge>;
        if (stock < 10) return <Badge variant="warning">Low Stock</Badge>;
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">In Stock</Badge>;
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-navy">Products</h1>
                    <p className="text-sm text-gray-500">Manage your product catalog</p>
                </div>
                <Button className="bg-orange hover:bg-orange/90 gap-2">
                    <Plus className="h-4 w-4" /> Add Product
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between space-y-0 pb-4">
                    <CardTitle className="text-base font-semibold">Product List</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search products..."
                                className="pl-9 w-[250px]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4 text-gray-500" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-10">Loading products...</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>${product.price.toFixed(2)}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell>{getStatusBadge(product.stock)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Edit className="h-4 w-4 text-blue-600" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Products;
