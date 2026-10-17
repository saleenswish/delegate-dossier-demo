interface Props {
    message: string;
}

export default function ErrorMessage({ message }: Props) {
    return (
        <div className="mx-auto my-10 max-w-md rounded-lg border border-red-300 bg-red-50 p-4 text-center text-red-700">
            <p className="font-semibold">Something went wrong</p>
            <p className="text-sm">{message}</p>
        </div>
    );
}
