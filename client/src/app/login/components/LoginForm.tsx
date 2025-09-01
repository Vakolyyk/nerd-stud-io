"use client";

import Image from "next/image";
import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Google from "../../../../public/google.png";
import { SubmitHandler, useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string
  password: string
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<LoginFormInputs>();
  
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 text-xs">
      <div>
        <h4 className="text-sm mb-1.5 font-medium">Увійди у свій акаунт</h4>
        <p className="text-text-secondary">
          Введи електронну пошту для входу в акаунт
        </p>
      </div>
      <div>
        <p className="mb-2 font-medium">Електронна пошта</p>
        <Input placeholder="example@gmail.com" type="email" required {...register("email")} />
      </div>
      <div>
        <div className="mb-2 flex justify-between items-center">
          <p className="font-medium">Пароль</p>
          <Button variant="link" size="link" className="text-xs">
            Забув пароль?
          </Button>
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
      </div>
      <div className="flex flex-col gap-2">
        <Button type="submit" className="bg-transparent-green text-green">Увійти</Button>
        <Button>
          Увійти через Google
          <Image src={Google} alt="google" width={14} height={14} />
        </Button>
        <div className="my-2 mx-auto h-px w-[240px] bg-text-secondary" />
        <Button>Створити акаунт</Button>
      </div>
    </form>
  );
};

export default LoginForm;
