type AuthFormContainerProps = {
  children: React.ReactNode;
  className: string;
};

const AuthFormContainer = ({
  children,
  className = "",
}: AuthFormContainerProps) => (
  <div
    className={`flex gap-4 p-4 sm:w-[400px] bg-background-primary rounded-2xl ${className}`}
  >
    {children}
  </div>
);

export default AuthFormContainer;
