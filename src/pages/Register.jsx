import { Link, Form, useActionData } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");
  let email = formData.get("email");
  let password = formData.get("password");
  return { displayName, photoURL, email, password };
};

function Register() {
  const data = useActionData();
  const { registerWithGoogle, register } = useRegister();
  useEffect(() => {
    if (data) {
      register(data);
    }
  }, [data]);
  return (
    <div className="h-screen grid place-content-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center font-bold text-3xl">Register</h4>
        <input
          type="text"
          label="Display Name :"
          name="displayName"
          placeholder="User Name"
        />
        <input
          type="url"
          label="Photo URL"
          name="photoURL"
          placeholder="https://photoURL.com"
        />
        <input
          type="email"
          label="E-mail"
          name="email"
          placeholder="test@gmail.com"
        />
        <input
          type="password"
          label="Password"
          name="password"
          placeholder="00000000"
        />
        <button className="mt-4 btn btn-primary btn-block capitalize">
          Login
        </button>
        <button
          onClick={registerWithGoogle}
          className="btn btn-primary w-full  mb-5"
        >
          <FcGoogle className="text-3xl" />
          <span className="text-2xl">Google</span>
        </button>

        <p className="text-center">
          Not a member yet ?
          <Link to="/login" className="capitalize link">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Register;
