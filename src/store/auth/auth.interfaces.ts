export enum AuthStatus {
  "CHECKING" = "Checking",
  "NOT_AUTH" = "Not-authenticated",
  "AUTH" = "Authenticated",
}

export interface AuthState {
  status: AuthStatus;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}

export interface AuthGoogle
  extends Omit<AuthState, "status" | "errorMessage"> {}
