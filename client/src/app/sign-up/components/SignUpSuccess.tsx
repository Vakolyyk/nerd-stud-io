import Image from "next/image";

import Dog from "../../../../public/dog.png";

const SignUpSuccess = () => {
  return (
    <div className="flex flex-col gap-4 px-4 py-6 text-xs font-medium sm:w-[400px] bg-background-primary rounded-2xl">
      <h2 className="text-2xl">Акаунт успішно створено</h2>
      <Image
        src={Dog}
        alt="google"
        width={200}
        height={200}
        className="mx-auto"
      />
      <p>Ми налаштовуємо простір для твого бізнесу:</p>
      <div className="h-px bg-text-secondary" />
      <div className="flex flex-col gap-2 font-normal">
        <p>🔐 Безпечно зберігаємо дані акаунта</p>
        <p>🎁 Активуємо твій 30-денний пробний період</p>
        <p>🧩 Створюємо персональне середовище для керування</p>
        <p>📊 Готуємо інструменти для зручного менеджменту</p>
      </div>
      <div className="h-px bg-text-secondary" />
      <p className="text-[8px] text-right">
        Зачекай кілька секунд — все майже готово!
      </p>
      <div className="h-2.5 bg-[#48BB9B1A] rounded-[5px] overflow-hidden">
        <div className="h-full bg-[#48BB9BE5] animate-[progress_5s_linear_forwards]"></div>
      </div>
    </div>
  );
};

export default SignUpSuccess;
