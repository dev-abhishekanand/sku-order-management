import Button from "./Button";

const DashboardCard = ({
    title,
    description,
    metrics,
    buttonText,
    onClick,
}) => (
    <div className="flex flex-col justify-between min-h-[360px] backdrop-blur-md bg-white/70 border border-gray-300 rounded-2xl shadow-xl p-6 transition-all hover:shadow-2xl">
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
            <p className="text-gray-600 mb-6">{description}</p>
            <div className="space-y-2">{metrics}</div>
        </div>
        <div className="mt-6">
            <Button
                onClick={onClick}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition w-full"
            >
                {buttonText} <span className="text-lg">→</span>
            </Button>
        </div>
    </div>
);
export default DashboardCard;
