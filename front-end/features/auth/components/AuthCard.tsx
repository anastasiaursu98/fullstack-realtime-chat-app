export const AuthCard = ({
  title,
  children,
  error,
}: {
  title: string;
  children: React.ReactNode;
  error?: string;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      <div className="text-center">
        {error && (
          <p className="text-red-500 text-base font-normal mb-4">{error}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};
