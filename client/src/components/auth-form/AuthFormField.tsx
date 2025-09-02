type AuthFormFieldProps = {
  children: React.ReactNode;
  title: string | React.ReactNode;
  error?: string;
};

const AuthFormField = ({ children, title, error = "" }: AuthFormFieldProps) => {
  return (
    <div>
      <div className="mb-2 font-medium">{title}</div>
      {children}
      {error && <p className="px-4 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default AuthFormField;
