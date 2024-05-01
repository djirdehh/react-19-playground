import { use, createContext } from "react";

interface Context {
  data: string;
}

const Context = createContext<Context | null>(null);

const Child5 = () => {
  const context = use(Context);
  return context ? <div>{context.data}</div> : null;
};

const Child4 = () => {
  return <Child5 />;
};

const Child3 = () => {
  return <Child4 />;
};

const Child2 = () => {
  return <Child3 />;
};

const Child = () => {
  return <Child2 />;
};

export const UseWithContextExample = () => {
  return (
    <Context.Provider value={{ data: "Data from context!" }}>
      <Child />
    </Context.Provider>
  );
};
