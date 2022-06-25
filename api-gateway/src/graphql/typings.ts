/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface SignupUserInput {
  name: string;
  email: EmailAddress;
  password: string;
  age?: UnsignedInt;
}

export interface LoginUserInput {
  email: EmailAddress;
  password: string;
}

export interface UpdateProfileInput {
  name?: string;
  age?: UnsignedInt;
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface DepositWithdrawSavingInput {
  amount: Number;
}

export interface IMutation {
  signup(data: SignupUserInput): UserPayload | Promise<UserPayload>;
  login(data: LoginUserInput): UserPayload | Promise<UserPayload>;
  refreshToken(): UserPayload | Promise<UserPayload>;
  logout(): boolean | Promise<boolean>;
  updateProfile(data: UpdateProfileInput): UserPayload | Promise<UserPayload>;
  updatePassword(
    data?: UpdatePasswordInput
  ): UserPayload | Promise<UserPayload>;

  withdrawSaving(
    data?: DepositWithdrawSavingInput
  ): SavingPayload | Promise<SavingPayload>;
  depositSaving(
    data?: DepositWithdrawSavingInput
  ): SavingPayload | Promise<SavingPayload>;
}

export interface IQuery {
  user(id: string): User | Promise<User>;
  users(
    q?: string,
    first?: number,
    last?: number,
    before?: string,
    after?: string,
    filterBy?: JSONObject,
    orderBy?: string
  ): UsersConnection | Promise<UsersConnection>;
  me(): User | Promise<User>;
}

export interface ErrorPayload {
  field?: string;
  message?: string[];
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface User {
  id: string;
  name: string;
  email: EmailAddress;
  age?: UnsignedInt;
  createdAt: DateTime;
  updatedAt: DateTime;
  version: number;
}

export interface UsersConnection {
  edges: UserEdge[];
  pageInfo: PageInfo;
}

export interface UserEdge {
  node: User;
  cursor: string;
}

export interface UserPayload {
  errors?: ErrorPayload[];
  user?: User;
  accessToken?: String;
  refreshToken?: String;
}

export type DateTime = any;
export type EmailAddress = any;
export type UnsignedInt = any;
export type JSONObject = any;

// Savings
export interface Saving {
  id: string;
  usersId: string;
  balanceAmount: number;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface SavingsConnection {
  edges: UserEdge[];
  pageInfo: PageInfo;
}

export interface SavingEdge {
  node: User;
  cursor: string;
}

export interface SavingPayload {
  errors?: ErrorPayload[];
  balanceAmount?: Number;
}

export interface DepositWithdrawSavingInput {
  amount: Number;
}
