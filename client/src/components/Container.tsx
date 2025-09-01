type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => (
  <div className="flex-grow max-w-[400px] mx-auto">{children}</div>
);

export default Container;
