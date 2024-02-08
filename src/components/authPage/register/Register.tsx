import { RegisterButton } from "../../../shared/buttons/RegisterButton";
import { registerThunk } from "../../../redux/auth/operations";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../../../helpers/schemas";
import { useAppDispatch } from "../../../redux/hooks";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schemaRegister),
  });

  const submit: SubmitHandler<RegisterFormData> = (data) => {
    dispatch(registerThunk(data));
    reset();
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit(submit)}>
        <input type="text" placeholder="Name" {...register("name")} />
        {errors?.name && <div>{errors.name.message}</div>}
        <input type="email" placeholder="Email" {...register("email")} />
        {errors?.email && <div>{errors.email.message}</div>}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors?.password && <div>{errors.password.message}</div>}
        <RegisterButton onClick={handleSubmit(submit)}>Enter</RegisterButton>
      </form>
      <a href="#">Login</a>
    </div>
  );
};

export default Register;
