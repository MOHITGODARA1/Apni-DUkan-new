import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Search, Mail, Phone } from "lucide-react";

const Customers = () => {
    // Mock Data
    const customers = [
        { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234 567 890", orders: 12, joined: "2023-01-15" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 987 654 321", orders: 5, joined: "2023-02-20" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "+1 555 123 456", orders: 2, joined: "2023-03-10" },
        { id: 4, name: "Alice Brown", email: "alice@example.com", phone: "+1 444 555 666", orders: 8, joined: "2023-04-05" },
        { id: 5, name: "Charlie Davis", email: "charlie@example.com", phone: "+1 777 888 999", orders: 1, joined: "2023-05-12" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-navy">Customers</h1>
                    <p className="text-sm text-gray-500">Manage your customer base</p>
                </div>
            </div>

            <Card>
                <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between space-y-0 pb-4">
                    <div className="flex items-center gap-2 flex-1">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search customers..."
                                className="pl-9"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Contact Info</TableHead>
                                <TableHead>Total Orders</TableHead>
                                <TableHead>Joined Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell className="font-medium">{customer.name}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {customer.email}</span>
                                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {customer.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{customer.orders}</TableCell>
                                    <TableCell>{customer.joined}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">View History</Button>
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

export default Customers;
