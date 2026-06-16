export const SectionHeader = ({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow: string;
  description: string;
}) => {
  return (
    <>
      <div className="flex justify-center">
        <p className="uppercase font-semibold tracking-widest text-xs text-[#c084f5] text-center">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-heading text-3xl md:text-5xl text-center mt-6 text-white">
        {title}
      </h2>
      <p className="text-center md:text-lg lg:text-xl text-white/50 mt-4 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
    </>
  );
};
