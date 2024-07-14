import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
    return new Response("Hello, world!", {
        headers: {
            "Content-Type": "text/html",
        },
    });
}

export default function AppPage() {
    return (
        <div>
            <h1>App</h1>
        </div>
    );
}