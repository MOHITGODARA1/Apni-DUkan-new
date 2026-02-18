import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import { Save } from "lucide-react";

const Settings = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        shopName: user?.businessName || "My Awesome Shop",
        address: user?.address || "123 Market St, City",
        phone: user?.phone || "+1 234 567 890",
        email: user?.email || "shop@example.com",
        gst: "GSTIN123456789",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API call to update settings
        alert("Settings saved!");
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-navy">Shop Settings</h1>
                <p className="text-sm text-gray-500">Manage your store details and preferences</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>General Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Shop Name</label>
                                <Input
                                    name="shopName"
                                    value={formData.shopName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">GST / Tax ID</label>
                                <Input
                                    name="gst"
                                    value={formData.gst}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Shop Address</label>
                            <Input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Contact Phone</label>
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Contact Email</label>
                                <Input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="bg-orange hover:bg-orange/90 gap-2">
                                <Save className="h-4 w-4" /> Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Settings;
