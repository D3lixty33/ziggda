"use client";

type DataCard = {
  variant: "total" | "net" | "lord";
  value: number;
  title: string;
  description: string;
};

const variantStyles = {
  total: "from-indigo-500/10 to-indigo-500/5 text-indigo-600",
  net: "from-emerald-500/10 to-emerald-500/5 text-emerald-600",
  lord: "from-rose-500/10 to-rose-500/5 text-rose-600",
};

export default function CardShow({
  variant,
  value,
  title,
  description,
}: DataCard) {
  return (
    <div
      className={`
        relative w-auto rounded-2xl border border-neutral-200/60
        bg-gradient-to-br ${variantStyles[variant]}
        p-5 shadow-sm backdrop-blur
        transition-all duration-200
        hover:shadow-md hover:-translate-y-[1px]
      `}
    >
      {/* Title */}
      <h2 className="text-sm font-medium text-neutral-600">
        {title}
      </h2>

      {/* Value */}
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-semibold tracking-tight text-neutral-900">
          {value.toLocaleString()}
        </span>
      </div>

      {/* Description */}
      <p className="mt-1 text-xs text-neutral-500">
        {description}
      </p>
    </div>
  );
}
