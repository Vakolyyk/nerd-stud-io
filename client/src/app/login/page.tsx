import LoginForm from "./components/LoginForm";
import AuthFormContainer from "@/components/auth-form/AuthFormContainer";
import SupportTeamLink from "@/components/auth-form/SupportTeamLink";

const LoginPage = () => (
  <div className="flex flex-col justify-center">
    <AuthFormContainer className="mb-7.5">
      <LoginForm />
    </AuthFormContainer>
    <SupportTeamLink />
  </div>
);

export default LoginPage;
