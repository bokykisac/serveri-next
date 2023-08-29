import MatrixDigitalRain from "@/components/MatrixDigitalRain";
import UserAuthForm from "@/components/UserAuthForm";

const Login = () => {
  return (
    <div>
      <MatrixDigitalRain blur />
      <div className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center ">
        <div className="mx-auto flex w-full flex-col justify-center max-w-lg">
          <div className="border rounded-lg border-slate-300 flex flex-col items-center p-10 bg-white drop-shadow-xl">
            <UserAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
