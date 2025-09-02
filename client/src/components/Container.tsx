type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => (
  <div className="flex justify-center flex-grow">{children}</div>
);

export default Container;
