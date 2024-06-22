import Link from "next/link";

export default function SideBar() {
  const isAuthenticated = true;
  return (
    <div
      className="fixed top-12 left-0 z-40  w-56 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto  bg-[#FF9B0F]">
        <div>
          Popular Things to Watch
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href={"/"}
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group"
              >
                <span className="ms-3">External Pg1</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
              >
                <span className="ms-3">External Pg2</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
              >
                <span className="ms-3">External Pg3</span>
              </Link>
            </li>
          </ul>
        </div>

        {isAuthenticated && (
          <div>
            <h2 className="text-gray-900 ">Your Followers</h2>
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="https://follower1.com"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                >
                  <span className="ms-3">Follower 1</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://follower2.com"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                >
                  <span className="ms-3">Follower 2</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://follower3.com"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                >
                  <span className="ms-3">Follower 3</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
