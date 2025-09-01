import LoginForm from "./components/LoginForm";
import AuthFormContainer from "@/components/AuthFormContainer";
import SupportTeamLink from "@/components/SupportTeamLink";

const LoginPage = () => (
  <div className="flex flex-col justify-center">
    <AuthFormContainer className="mb-7.5">
      <LoginForm />
    </AuthFormContainer>
    <SupportTeamLink />
  </div>
);

export default LoginPage;
