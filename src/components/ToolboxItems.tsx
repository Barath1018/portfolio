import { twMerge } from "tailwind-merge";
import { TechIcon } from "./TechIcon";
import { Fragment } from "react";

export const ToolboxItems = ({
  items,
  className,
  itemsWrapperClassName,
}: {
  items: {
    title: string;
    iconSrc?: string;
    iconSize?: number;
    iconComponent?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    color?: string;
  }[];
  className?: string;
  itemsWrapperClassName?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        className={twMerge(
          "flex flex-none py-0.5 gap-3 pr-3",
          itemsWrapperClassName
        )}
      >
        {[...new Array(2)].map((_, index) => (
          <Fragment key={index}>
            {items.map((item) => (
              <div
                key={item.title}
                className="inline-flex flex-col items-center justify-center gap-1.5 py-2.5 px-3 bg-white/5 border border-white/10 rounded-xl w-[78px] h-[78px] shrink-0 hover:bg-white/10 transition-colors"
              >
                <TechIcon
                  src={item.iconSrc}
                  iconComponent={item.iconComponent}
                  color={item.color}
                  name={item.title}
                  size={item.iconSize}
                />
                <span className="text-[10px] font-medium text-white/70 text-center leading-tight">
                  {item.title}
                </span>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
