export class AppRoutes {
  static Home = "/";

  // auth
  static AuthSingIn = "/login";
  static AuthClientSingUp = "/primary-auth";
  static AuthClientForgotPassword = "/client/forgot-password";
  static AuthShareholderSignUp = "/shareholder/primary-shareholder-auth";
  static AuthShareholderForgotPassword = "/shareholder/forgot-password";
  static AuthApplicantSignUp = "/applicant/primary-applicant-auth";
  static AuthApplicantForgotPassword = "/applicant/forgot-password";

  // cabinet
  static ClientCabinet = "/client/home";
  static ClientProfile = "/client/profile";
  static ShareholderCabinet = "/client/home"; // ?
  static ApplicantCabinet = "/applicant/profile";
}
