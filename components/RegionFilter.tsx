interface Props {
    value: string;
    onChange: (value: string) => void;
}

const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function RegionFilter({ value, onChange }: Props) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-teal-700"
        >
            {REGIONS.map((region) => (
                <option key={region} value={region}>
                    {region}
                </option>
            ))}
        </select>
    );
}
