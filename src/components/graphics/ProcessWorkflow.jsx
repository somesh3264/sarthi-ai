export default function ProcessWorkflow({ steps, icons = [] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-4 bottom-4 w-px bg-grey-dark/15 sm:left-0 sm:right-0 sm:top-4 sm:bottom-auto sm:h-px sm:w-auto" />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-4 sm:gap-6">
        {steps.map((step, i) => {
          const Icon = icons[i];
          return (
            <div key={step.title} className="relative flex gap-4 sm:block sm:gap-0">
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-xs font-semibold text-white sm:mb-5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                {Icon && (
                  <div className="mb-2 hidden text-teal sm:block">
                    <Icon className="h-5 w-5" />
                  </div>
                )}
                <h3 className="text-base font-semibold text-navy">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-grey-dark/70">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
