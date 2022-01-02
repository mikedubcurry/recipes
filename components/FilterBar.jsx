import { useEffect, useRef, useState } from "react";

function FilterBar({ children }) {
    const [filterOpen, setFilterOpen] = useState(false);

    const filterRef = useClickOutside(setFilterOpen);

    return (
        <footer ref={filterRef} className={`w-full bg-red-500 fixed z-99 bottom-0`}>
            <button onClick={() => setFilterOpen(!filterOpen)}>Filter</button>
            <section
                className={` transition-[max-height] h-auto ${
                    filterOpen ? " max-h-300" : "max-h-0"
                }`}
            >
                {children}
            </section>
        </footer>
    );
}

export default FilterBar;

function useClickOutside(setState) {
    const element = useRef();

    function handleClickOutside(e) {
        e.stopPropagation();
        if (e.target.contains(element.current)) {
            setState(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return element;
}
