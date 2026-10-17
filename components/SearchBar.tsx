interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search a country..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-teal-700 sm:flex-1"
        />
    );
}
