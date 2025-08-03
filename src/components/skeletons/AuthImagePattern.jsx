const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-center p-14  ">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl border-zinc-700 border-2 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
              style={{ minWidth: '60px', minHeight: '60px' }}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-zinc-500">{title}</h2>
        <p className="text-zinc-400">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
