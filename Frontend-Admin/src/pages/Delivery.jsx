import { Truck, CheckCircle, Clock, MapPin } from "lucide-react";

const MOCK_DELIVERIES = [
    { id: "TRK-001", orderId: "ORD-001", customer: "John Doe", status: "Out for Delivery", location: "New Delhi", expected: "Today" },
    { id: "TRK-002", orderId: "ORD-003", customer: "Robert Brown", status: "Shipped", location: "Mumbai Hub", expected: "Tomorrow" },
    { id: "TRK-003", orderId: "ORD-005", customer: "Michael Green", status: "Processing", location: "Warehouse", expected: "Feb 22, 2026" },
];

const Delivery = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Delivery Tracking</h1>

            <div className="grid gap-6">
                {MOCK_DELIVERIES.map((delivery) => (
                    <div key={delivery.id} className="bg-[#111827] rounded-lg border border-[#1f2937] p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Order #{delivery.orderId}</h3>
                                <p className="text-sm text-gray-400">Tracking ID: {delivery.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-400">Expected Delivery</p>
                                <p className="text-lg font-bold text-blue-400">{delivery.expected}</p>
                            </div>
                        </div>

                        {/* Progress Stepper */}
                        <div className="relative flex items-center justify-between w-full">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#1f2937] -z-10"></div>

                            {["Processing", "Shipped", "Out for Delivery", "Delivered"].map((step, index) => {
                                const currentStatusIndex = ["Processing", "Shipped", "Out for Delivery", "Delivered"].indexOf(delivery.status);
                                const isCompleted = index <= currentStatusIndex;
                                const isCurrent = index === currentStatusIndex;

                                return (
                                    <div key={step} className="flex flex-col items-center bg-[#111827] px-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${isCompleted
                                                ? "bg-green-500 border-green-500 text-white"
                                                : "bg-[#1f2937] border-[#374151] text-gray-500"
                                            }`}>
                                            {isCompleted ? <CheckCircle size={16} /> : <Clock size={16} />}
                                        </div>
                                        <span className={`text-xs mt-2 font-medium ${isCurrent ? "text-green-500" : "text-gray-500"
                                            }`}>
                                            {step}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-sm text-gray-400 bg-[#1f2937]/50 p-3 rounded-lg">
                            <MapPin size={16} className="text-blue-400" />
                            <span>Current Location: <span className="text-white font-medium">{delivery.location}</span></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Delivery;
