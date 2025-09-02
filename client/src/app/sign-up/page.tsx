import SignUpForm from "./components/SignUpForm";
import SupportTeamLink from "@/components/SupportTeamLink";
import AuthFormContainer from "@/components/AuthFormContainer";

const SignUpPage = () => (
    <div className="flex flex-col justify-center">
        <AuthFormContainer className="mb-7.5">
        <SignUpForm />
        </AuthFormContainer>
        <SupportTeamLink />
    </div>
);

export default SignUpPage;
