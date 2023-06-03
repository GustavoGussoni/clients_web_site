import RegisterForm from "@/components/registerForm";
import { NextPage } from "next";

const Register: NextPage = () => {
  return (
    <main
      className={`body flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <RegisterForm />
    </main>
  );
};

export default Register;
