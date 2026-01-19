interface Props {
  title: string;
}

const MyComponent: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <h1>My Component</h1>
      <h1>My {title}</h1>
    </div>
  );
};

export default MyComponent;
