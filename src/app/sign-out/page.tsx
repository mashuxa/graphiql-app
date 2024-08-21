import { NextPage } from "next";

const SignOut: NextPage = () => {
  return (
    <main
      className="flex flex-col grow justify-center items-center text-black"
      data-testid="sign-out-main"
    >
      <div className="bg-white p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Are you really want to sign out?
        </h1>
        <form className="space-y-4">
          <div className="flex space-x-6">
            <button
              type="submit"
              className="w-full flex justify-center p-2 border"
            >
              Yes
            </button>
            <button
              type="submit"
              className="w-full flex justify-center p-2 border"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignOut;
