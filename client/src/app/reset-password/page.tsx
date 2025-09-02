import { Suspense } from "react";
import ResetPasswordForm from "./component/ResetPasswordForm";

const ResetPasswordPage = () => (
  <div className="flex flex-col justify-center">
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  </div>
);

export default ResetPasswordPage;
