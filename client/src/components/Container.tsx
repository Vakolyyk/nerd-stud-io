type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => (
  <div className="flex flex-grow mx-auto">{children}</div>
);

export default Container;
