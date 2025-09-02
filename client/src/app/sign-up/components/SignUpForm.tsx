"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AuthFormField from "@/components/auth-form/AuthFormField";
import SupportTeamLink from "@/components/auth-form/SupportTeamLink";
import AuthFormProgress from "@/components/auth-form/AuthFormProgress";
import AuthFormContainer from "@/components/auth-form/AuthFormContainer";
import SignUpSuccess from "./SignUpSuccess";

type SignUpInputs = {
  companyName: string;
  companyAddress: string;
  companyType: string;
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
  code: string;
};

const companyTypes = [
  {
    title: "Ресторани та кафе",
    value: "restaurants_cafe",
  },
  {
    title: "Роздрібна торгівля",
    value: "retail",
  },
  {
    title: "Сфера краси та здоров’я",
    value: "beauty_health",
  },
  {
    title: "Готельно-ресторанна сфера",
    value: "hotel_restaurant",
  },
  {
    title: "Сервісні компанії",
    value: "service_companies",
  },
  {
    title: "Івент-компанії та квиткові сервіси",
    value: "event_ticket_services",
  },
  {
    title: "Фітнес та дозвілля",
    value: "fitness_leisure",
  },
  {
    title: "Інше",
    value: "other",
  },
];

const SignUpForm = () => {
  const [successSignUp, setSuccessSignUp] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignUpInputs>({
    defaultValues: {
      companyName: "",
      companyAddress: "",
      companyType: "restaurants_cafe",
      email: "",
      password: "",
      repeatPassword: "",
      phone: "",
      code: "",
    },
  });

  const code = watch("code");

  useEffect(() => {
    if (!code) {
      const newCode = Array.from({ length: 6 }).reduce<string>(
        (acc) => acc + Math.floor(Math.random() * 10),
        "",
      );
      setValue("code", newCode);
    }
  }, [code]);

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    if (data.password !== data.repeatPassword) {
      setError("repeatPassword", { message: "Паролі не збігаються" });
      return null;
    }
    console.log(data);
    setStep(1);
    setSuccessSignUp(true);
    reset();
  };

  const stepOneComplete = () => {
    const companyName = watch("companyName");
    const companyAddress = watch("companyAddress");
    const companyType = watch("companyType");

    if (!Boolean(companyName && companyAddress && companyType)) {
      return null;
    }

    setStep(2);
  };

  return successSignUp ? (
    <SignUpSuccess />
  ) : (
    <>
      <AuthFormContainer className="mb-7.5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 text-xs"
        >
          <div>
            <h4 className="text-sm mb-1.5 font-medium">Створи свій акаунт</h4>
            <p className="text-text-secondary">
              Введи свою електронну пошту, щоб створити акаунт
            </p>
          </div>
          <AuthFormProgress activeStep={step} stepsCount={2} />
          {step === 1 ? (
            <>
              <AuthFormField
                title="Назва компанії"
                error={errors.companyName?.message}
              >
                <Input
                  placeholder="Назва твоєї компанії"
                  type="text"
                  {...register("companyName", {
                    required: "Введіть назву компанії",
                  })}
                />
              </AuthFormField>
              <AuthFormField
                title="Юридична адреса компанії"
                error={errors.companyAddress?.message}
              >
                <Input
                  placeholder="Адреса твоєї компанії"
                  type="text"
                  {...register("companyAddress", {
                    required: "Введіть адресу компанії",
                  })}
                />
              </AuthFormField>
              <AuthFormField
                title="Тип компанії"
                error={errors.companyType?.message}
              >
                <Controller
                  name="companyType"
                  control={control}
                  rules={{ required: "Оберіть тип компанії" }}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col gap-2"
                    >
                      {companyTypes.map((type) => (
                        <div
                          key={type.value}
                          className="flex items-center gap-3"
                        >
                          <RadioGroupItem value={type.value} id={type.value} />
                          <label htmlFor={type.value} className="text-xs">
                            {type.title}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </AuthFormField>
            </>
          ) : (
            <>
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
              <AuthFormField title="Телефон" error={errors.phone?.message}>
                <Input
                  placeholder="+380 50 889 10 63"
                  type="text"
                  {...register("phone", { required: "Введіть телефон" })}
                />
              </AuthFormField>
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
              <AuthFormField
                title="Твій код допуску до POS системи"
                error={errors.code?.message}
              >
                <div className="flex gap-2">
                  {code &&
                    code.split("").map((value, index) => (
                      <span
                        key={index}
                        className="flex items-center justify-center w-10 h-10 bg-background-secondary rounded-[10px] border border-text-secondary"
                      >
                        {value}
                      </span>
                    ))}
                </div>
              </AuthFormField>
            </>
          )}
          {step === 1 ? (
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => router.push("/login")}
                className="flex justify-between flex-grow"
              >
                <ArrowLeft />
                Назад
              </Button>
              <Button
                onClick={stepOneComplete}
                className="flex justify-between flex-grow bg-transparent-green text-green"
              >
                Далі
                <ArrowRight />
              </Button>
            </div>
          ) : (
            <Button type="submit" className="bg-transparent-green text-green">
              Зареєструватися
            </Button>
          )}
        </form>
      </AuthFormContainer>
      {!successSignUp && <SupportTeamLink />}
    </>
  );
};

export default SignUpForm;
