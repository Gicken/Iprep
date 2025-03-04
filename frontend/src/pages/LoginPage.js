import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <Link to="/recovery" className="text-blue-500">
                Forgot your password?
            </Link>
        </div>
    );
}