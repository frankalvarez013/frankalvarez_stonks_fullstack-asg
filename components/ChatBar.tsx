export default function ChatBar() {
  return (
    <div
      className="fixed top-12 right-0 z-40 w-80 h-screen transition-transform translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full w-full px-3 py-4 overflow-y-auto  bg-[#FF9B0F]">
        <div className="flex w-full h-full flex-col ">
          <div className="w-full">Stream Chat</div>
          <div className=" w-full h-[75%] bg-orange-200 border border-orange-200 rounded-t-md">
            hi
          </div>
          <div className=" w-full  rounded-t-md">Keyboard</div>
        </div>
      </div>
    </div>
  );
}
