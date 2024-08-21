import { NextPage } from "next";

const SignIn: NextPage = () => {
  return (
    <main
      className="flex flex-col grow justify-center items-center text-black"
      data-testid="sign-in-main"
    >
      <div className="bg-white p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign In / Sign Up
        </h1>
        <form className="space-y-4">
          <div>
            <label>
              Email
              <input
                type="email"
                id="email"
                className="w-full p-2 border"
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="password"
                id="password"
                className="w-full p-2 border"
                required
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center p-2 border"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
