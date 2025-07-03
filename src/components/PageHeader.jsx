const PageHeader = ({ title, leftActions, rightActions, children }) => (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-4">
            {leftActions}
            <h1 className="font-bold text-2xl px-4 py-2 bg-gray-700 text-white rounded-2xl">
                {title}
            </h1>
        </div>
        {rightActions && (
            <div className="flex items-center gap-2">{rightActions}</div>
        )}
        {children}
    </div>
);
export default PageHeader