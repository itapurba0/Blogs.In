export function Avatar({ name, size = 6 }: { name: string, size?: number }) {
    return (
      <div className="flex items-center justify-center">
        <div
          className={`relative flex justify-center items-center w-${size} h-${size} rounded-full overflow-hidden bg-[#2E865F] text-white p-2 z-10 shadow-md hover:shadow-lg transition duration-200`}
        >
          <span
            className={`font-${size > 6 ? "lg" : "xs"} text-white`}
          >
            {name[0]}
          </span>
        </div>
      </div>
    );
  }