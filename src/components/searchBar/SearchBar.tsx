import './search-bar.css';

export interface SearchBarProps {
    onSearch: (query: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    return (
        <div className="search-bar outlined md">
            <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            />
            <div>
                <span className="right-line-top"></span>
                <span className="right-line-bottom"></span>
                <span className="left-line-top"></span>
                <span className="left-line-bottom"></span>
                <span className="top-line-left"></span>
                <span className="bottom-line-left"></span>
                <span className="top-line-right"></span>
                <span className="bottom-line-right"></span>
            </div>
        </div>
    );
};