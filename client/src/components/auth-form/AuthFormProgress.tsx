import React from "react";

type AuthFormProgressProps = {
  stepsCount: number;
  activeStep: number;
};

const AuthFormProgress = ({
  stepsCount,
  activeStep,
}: AuthFormProgressProps) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: stepsCount }).map((_, index) => (
        <React.Fragment key={index}>
          <span
            key={index}
            className={`flex items-center justify-center w-10 h-10 bg-background-secondary rounded-[10px] border border-text-secondary ${activeStep !== index + 1 && "text-text-secondary"}`}
          >
            {index + 1}
          </span>
          {index < stepsCount - 1 && (
            <span className="flex-1 max-w-[120px] h-px bg-text-secondary mx-2"></span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default AuthFormProgress;
