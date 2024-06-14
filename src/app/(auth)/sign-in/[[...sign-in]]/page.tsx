/** @format */
import { SignInForm } from "../../components/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
export default function Page() {
  return <SignInForm />;
}
