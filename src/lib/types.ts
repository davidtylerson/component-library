/**
 * Generic types to support polymorphic components
 */

// Base type for props without ref
export type AsProp<C extends React.ElementType> = {
    /**
     * An override of the default HTML tag.
     * @default based on component default
     */
    as?: C;
  };
  
  // Props that should be excluded from component props when defining "as" prop
  export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);
  
  // Polymorphic component props (without ref)
  export type PolymorphicComponentProps<
    C extends React.ElementType,
    Props = {}
  > = React.PropsWithChildren<Props & AsProp<C>> &
    Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
  
  // Polymorphic component props (with ref)
  export type PolymorphicComponentPropsWithRef<
    C extends React.ElementType,
    Props = {}
  > = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };
  
  // For polymorphic components that need refs
  export type PolymorphicRef<C extends React.ElementType> =
    React.ComponentPropsWithRef<C>["ref"];
  
  // For creating polymorphic components with proper ref forwarding
  export type PolymorphicComponentWithRef<
    Props,
    DefaultElementType extends React.ElementType
  > = <C extends React.ElementType = DefaultElementType>(
    props: PolymorphicComponentPropsWithRef<C, Props>
  ) => React.ReactElement | null;