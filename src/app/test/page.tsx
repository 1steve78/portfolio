import DashboardComponent from "@/components/DashboardComponent";

export default function TestPage() {
    return (
        <div className="min-h-screen pt-24 px-4 pb-16 relative">
            <div className="max-w-[1500px] mx-auto">
                <h1 className="text-4xl font-bold mb-8 px-4">
                    Testing: Dashboard Component
                </h1>

                <div className="border border-neutral-800 rounded-2xl bg-neutral-900/20 overflow-hidden">
                    <DashboardComponent />
                </div>
            </div>
        </div>
    );
}
