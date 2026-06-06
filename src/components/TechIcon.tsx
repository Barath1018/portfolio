import Image from "next/image";
import React from "react";

interface TechIconProps {
  src?: string;
  color?: string;
  name?: string;
  size?: number;
  iconComponent?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

export const TechIcon = ({ src, color, name, size = 32, iconComponent: Component }: TechIconProps) => {
  if (Component) {
    return <Component className="size-8" style={{ color }} />;
  }

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={name || "icon"}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
};
