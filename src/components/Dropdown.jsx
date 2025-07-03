import React, { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
const Dropdown = ({
    options = [],
    value = "",
    placeholder = "Search...",
    onSearch,
    onSelect,
    onLoadMore,
    renderItem = (item) => item?.label || item?.name || "",
    noResultsText = "No data found.",
    maxHeight = "160px",
    className = "",
}) => {
    const listRef = useRef(null);

    const handleScroll = () => {
        const list = listRef.current;
        if (!list) return;

        if (list.scrollTop + list.clientHeight >= list.scrollHeight - 10) {
            onLoadMore?.();
        }
    };

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className={`w-full relative ${className}`}>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={onSearch}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 pr-10 border border-gray-200 rounded shadow-lg focus:outline-none"
                />
                <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={18}
                />
            </div>

            {value && (
                <ul
                    ref={listRef}
                    onScroll={handleScroll}
                    className="border mt-1 rounded bg-white shadow max-h-40 overflow-y-auto z-10"
                    style={{ maxHeight }}
                >
                    {options.length > 0 ? (
                        options.map((item, i) => (
                            <li
                                key={i}
                                onClick={() => onSelect(item)}
                                className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                            >
                                {renderItem(item)}
                            </li>
                        ))
                    ) : (
                        <li className="px-3 py-2 text-gray-500 italic">{noResultsText}</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
