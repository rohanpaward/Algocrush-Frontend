export function Heading({ children }) {
    return (
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
        {children}
      </h1>
    );
  }