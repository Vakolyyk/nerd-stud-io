"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { Eye, EyeOff } from "lucide-react";

import AuthFormContainer from "@/components/auth-form/AuthFormContainer";
import AuthFormField from "@/components/auth-form/AuthFormField";
import AuthFormProgress from "@/components/auth-form/AuthFormProgress";
import SupportTeamLink from "@/components/auth-form/SupportTeamLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { forgotPassword, resetPassword } from "@/lib/auth";

type ResetPasswordFormInputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

const ResetPasswordForm = () => {
  const token = useSearchParams().get('token');

  const [step, setStep] = useState<1 | 2>(token ? 2 : 1);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormInputs>();

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    if (step === 1 && Boolean(data.email)) {
      await forgotPassword({ email: data.email });
      router.push('/login');
      alert("Лист для скидання паролю надіслано на пошту")
      return null;
    }

    if (step === 2 && data.password !== data.repeatPassword) {
      setError("repeatPassword", { message: "Паролі не збігаються" });
      return null;
    }

    await resetPassword({
      password: data.password,
      repeatPassword: data.repeatPassword,
      token: "064a73a32f3f3586c7e12ed516fe193a8ecbc4f0fe129eb2453a40ee6b367032", //template
    });

    router.push("/login");
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
                    {...register("password", {
                      required: "Введіть пароль",
                      minLength: {
                        value: 6,
                        message: "Мінімум 6 символів",
                      },
                    })}
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
                      minLength: {
                        value: 6,
                        message: "Мінімум 6 символів",
                      },
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
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-transparent-green text-green"
          >
            Відновити
          </Button>
        </form>
      </AuthFormContainer>
      <SupportTeamLink />
    </>
  );
};

export default ResetPasswordForm;
