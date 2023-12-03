type ComponentProps<E extends React.ElementType = "div"> = {
  as?: E;
};

type GenericProps<E extends React.ElementType> = ComponentProps<E> &
  Omit<React.ComponentProps<E>, keyof ComponentProps<E>>;

export default function PolymorphicPrimitive<
  E extends React.ElementType = "div",
>({ as, ...props }: GenericProps<E>) {
  const Component = as || "div";

  return <Component {...props} />;
}
