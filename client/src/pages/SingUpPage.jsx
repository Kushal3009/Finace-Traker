import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignUpPage() {
  return (
    <div className="bg-gray-50 flex items-center justify-center py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 p-8 rounded-md border-2 border-black  bg-white shadow-lg">
        {/* Header Section */}
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/signin"
        />

        {/* Signup Form Section */}
        <Signup />
      </div>
    </div>
  );
}
