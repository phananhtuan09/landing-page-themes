import { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

interface DistortionTargetProps<T extends ElementType = "div"> {
  children: ReactNode;
  className?: string;
  as?: T;
}

export function DistortionTarget<T extends ElementType = "div">({
  children,
  className = "",
  as,
  ...rest
}: DistortionTargetProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof DistortionTargetProps<T>>) {
  const Component = as || "div";

  return (
    <Component className={`distortion-target ${className}`} data-distortion="true" {...rest}>
      {children}
    </Component>
  );
}
