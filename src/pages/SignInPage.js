import React, {useEffect} from "react";
import SignIn from "../components/authentication/SignIn";
import MainLayout from "../layouts/mainLayout/MainLayout";

const SignInPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout title="Sign In ">
      <div className="container pt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="shadow-sm bg-white p-3">
              <SignIn />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignInPage;
