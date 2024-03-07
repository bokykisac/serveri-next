import MatrixDigitalRain from "@/components/MatrixDigitalRain";
import UserAuthForm from "@/components/UserAuthForm";

const Login = () => {
  return (
    <div>
      <MatrixDigitalRain blur />
      <div className="container absolute inset-0 mx-auto flex h-screen flex-col items-center justify-center ">
        <div className="mx-auto flex w-full max-w-lg flex-col justify-center">
          <div className="flex flex-col items-center rounded-lg border border-slate-300 bg-white p-10 drop-shadow-xl">
            <UserAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
