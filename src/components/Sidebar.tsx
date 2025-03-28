import { House } from "lucide-react";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="w-60 px-3 border-r py-16 h-full">
      <ul>
        <Link
          href={"/profile"}
          className="px-4 py-3 text-base flex items-center gap-4 transition"
        >
          <House className="w-5 h-5" />
          Home
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
