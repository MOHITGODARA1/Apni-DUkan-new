import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { AlertCircle, Save } from "lucide-react";

const Inventory = () => {
    // Mock Data
    const [inventory, setInventory] = useState([
        { id: 1, name: "Premium Headphones", sku: "PH-001", stock: 45, threshold: 10 },
        { id: 2, name: "Ergonomic Chair", sku: "EC-002", stock: 12, threshold: 15 },
        { id: 3, name: "Wireless Mouse", sku: "WM-003", stock: 8, threshold: 10 },
        { id: 5, name: "Desk Lamp", sku: "DL-005", stock: 0, threshold: 5 },
    ]);

    const handleStockChange = (id, newStock) => {
        setInventory(inventory.map(item =>
            item.id === id ? { ...item, stock: Number(newStock) } : item
        ));
    };

    const lowStockCount = inventory.filter(i => i.stock <= i.threshold).length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-navy">Inventory</h1>
                    <p className="text-sm text-gray-500">Manage stock levels and low stock alerts</p>
                </div>
                <Button className="bg-orange hover:bg-orange/90 gap-2">
                    <Save className="h-4 w-4" /> Save Changes
                </Button>
            </div>

            {lowStockCount > 0 && (
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="flex items-center gap-4 p-4">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                        <div>
                            <h3 className="font-semibold text-red-900">Low Stock Alert</h3>
                            <p className="text-sm text-red-700">
                                You have {lowStockCount} items running low/out of stock. Please restock soon.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Stock Levels</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Current Stock</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Update Stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventory.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-gray-500">{item.sku}</TableCell>
                                    <TableCell>
                                        <span className={item.stock <= item.threshold ? "text-red-600 font-bold" : ""}>
                                            {item.stock}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {item.stock === 0 ? (
                                            <Badge variant="destructive">Out of Stock</Badge>
                                        ) : item.stock <= item.threshold ? (
                                            <Badge variant="warning">Low Stock</Badge>
                                        ) : (
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">In Stock</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end">
                                            <Input
                                                type="number"
                                                className="w-24 text-right"
                                                value={item.stock}
                                                onChange={(e) => handleStockChange(item.id, e.target.value)}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Inventory;
