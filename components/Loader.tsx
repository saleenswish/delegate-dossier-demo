export default function Loader() {
    return (
        <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-700 border-t-transparent" />
            <span className="ml-3 text-gray-600">Loading countries...</span>
        </div>
    );
}
