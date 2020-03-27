export const withDefaultProps = <
  P extends object,
  DP extends Partial<P> = Partial<P>
>(
  defaultProps: DP,
  Cmp: ComponentType<P>
) => {
  // Extract required attributes
  type RequiredProps = Omit<P, keyof DP>;
  // Re-create our attribute definition, mark all original attributes as optional, and mandatory attributes as optional through an intersection type
  type Props = Partial<DP> & Required<RequiredProps>;

  Cmp.defaultProps = defaultProps;

  // Return the redefined property type component by turning off the type check of the original component before setting the correct property type
  return (Cmp as ComponentType<any>) as ComponentType<Props>;
};
