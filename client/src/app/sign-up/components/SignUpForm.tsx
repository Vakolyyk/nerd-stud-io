"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AuthFormProgress from "@/components/AuthFormProgress";

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
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const router = useRouter();

  const { register, handleSubmit, setValue, getValues, reset, watch } =
    useForm<SignUpInputs>({
        defaultValues: {
           companyName: "",
           companyAddress: "",
           companyType: "",
           email: "",
           password: "",
           repeatPassword: "",
           phone: "",
           code: ""
        }
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
    console.log(data);
    setStep(1); 
    reset();
  };

  const IsStepOneCompleted = () => {
    const companyName = watch("companyName");
    const companyAddress = watch("companyAddress");
    const companyType = watch("companyType");

    return Boolean(companyName && companyAddress && companyType);
  };

  return (
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
          <div>
            <p className="mb-2 font-medium">Назва компанії</p>
            <Input
              placeholder="Назва твоєї компанії"
              type="text"
              required
              {...register("companyName")}
            />
          </div>
          <div>
            <p className="mb-2 font-medium">Юридична адреса компанії</p>
            <Input
              placeholder="Адреса твоєї компанії"
              type="text"
              required
              {...register("companyAddress")}
            />
          </div>
          <div>
            <p className="mb-2 font-medium">Тип компанії</p>
            <RadioGroup
              defaultValue="restaurants_cafe"
              required
              {...register("companyType")}
            >
              {companyTypes.map((type) => (
                <div key={type.value} className="flex items-center gap-3">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <label htmlFor={type.value} className="text-xs">
                    {type.title}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </>
      ) : (
        <>
          <div>
            <p className="mb-2 font-medium">Електронна пошта</p>
            <Input
              placeholder="example@mail.com"
              type="text"
              required
              {...register("email")}
            />
          </div>
          <div>
            <p className="mb-2 font-medium">Телефон</p>
            <Input
              placeholder="+380 50 889 10 63"
              type="text"
              required
              {...register("phone")}
            />
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="************"
              required
              className="pr-8"
              {...register("password")}
            />
            <Button
              type="button"
              className="absolute right-4 inset-y-[15px] p-0 h-max"
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </Button>
          </div>
          <div className="relative">
            <Input
              type={showRepeatPassword ? "text" : "password"}
              placeholder="************"
              required
              className="pr-8"
              {...register("repeatPassword")}
            />
            <Button
              type="button"
              className="absolute right-4 inset-y-[15px] p-0 h-max"
              onClick={() => setShowRepeatPassword((value) => !value)}
            >
              {showRepeatPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </Button>
          </div>
          <div>
            <p className="mb-2 font-medium">Твій код допуску до POS системи</p>
            <div className="flex gap-2">
              {code && code.split("").map((value, index) => (
                <span
                  key={index}
                  className="flex items-center justify-center w-10 h-10 bg-background-secondary rounded-[10px] border border-text-secondary"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
      {step === 1 ? (
        <div className="flex gap-2">
          <Button
            onClick={() => router.push("/login")}
            className="flex justify-between flex-grow"
          >
            <ArrowLeft />
            Назад
          </Button>
          <Button
            onClick={() => setStep(2)}
            disabled={!IsStepOneCompleted()}
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
  );
};

export default SignUpForm;
