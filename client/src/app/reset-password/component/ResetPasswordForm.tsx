"use client";

import AuthFormContainer from "@/components/auth-form/AuthFormContainer";
import AuthFormField from "@/components/auth-form/AuthFormField";
import AuthFormProgress from "@/components/auth-form/AuthFormProgress";
import SupportTeamLink from "@/components/auth-form/SupportTeamLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ResetPasswordFormInputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

const ResetPasswordForm = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>();

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = (data) => {
    if (step === 1 && Boolean(data.email)) {
      setStep(2);
      return null;
    }

    if (step === 2 && data.password !== data.repeatPassword) {
      setError("repeatPassword", { message: "Паролі не збігаються" });
      return null;
    }

    console.log(data);
    setStep(1);
    reset();
  };

  return (
    <>
      <AuthFormContainer className="mb-7.5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 text-xs"
        >
          <div>
            <h4 className="text-sm mb-1.5 font-medium">Відновити пароль</h4>
            <p className="text-text-secondary">
              Вкажи свою електронну пошту для відновлення пароля
            </p>
          </div>
          <AuthFormProgress activeStep={step} stepsCount={2} />
          {step === 1 ? (
            <AuthFormField
              title="Електронна пошта"
              error={errors.email?.message}
            >
              <Input
                placeholder="example@mail.com"
                type="text"
                {...register("email", { required: "Введіть пошту" })}
              />
            </AuthFormField>
          ) : (
            <>
              <AuthFormField title="Пароль" error={errors.password?.message}>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="************"
                    className="pr-8"
                    {...register("password", { required: "Введіть пароль" })}
                  />
                  <Button
                    type="button"
                    className="absolute right-4 inset-y-[15px] p-0 h-max"
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </Button>
                </div>
              </AuthFormField>
              <AuthFormField
                title="Повтори пароль"
                error={errors.repeatPassword?.message}
              >
                <div className="relative">
                  <Input
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder="************"
                    className="pr-8"
                    {...register("repeatPassword", {
                      required: "Повторіть пароль",
                    })}
                  />
                  <Button
                    type="button"
                    className="absolute right-4 inset-y-[15px] p-0 h-max"
                    onClick={() => setShowRepeatPassword((value) => !value)}
                  >
                    {showRepeatPassword ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </Button>
                </div>
              </AuthFormField>
            </>
          )}
          <Button type="submit" className="bg-transparent-green text-green">
            Відновити
          </Button>
        </form>
      </AuthFormContainer>
      <SupportTeamLink />
    </>
  );
};

export default ResetPasswordForm;
