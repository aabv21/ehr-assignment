import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { User } from "firebase/auth";

export interface UserQuestionnaireOnboarding {
  investmentObjectives: string[];
  incomeQuestion: boolean;
  anticipateAnyNegativeQuestion: boolean;
  currentFinancialSituation: boolean;
  termsFlagQuestion: boolean;
  certifyFlagQuestion: boolean;
  signatureImage: string | null;
}

export interface UserIdentification {
  ssn: number;
  idType: string;
  idStateOfCountry: string;
  idExpirationDate: string;
  identificationImage: string | null;
  identificationImageUrl?: string | null;
}

export interface UserData extends User {
  title: string;
  onboardingCompleted: boolean;
  onboardingStepWelcome: boolean;
  onboardingStepProfile: boolean;
  onboardingStepIdentification: boolean;
  onboardingStepQuestionnaire: boolean;
  onboardingStepAch: boolean;
  // onboardingStepFundingSource: boolean;
  birthDate: string;
  marital: string;
  gender: string;
  ocupation: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: number;
  phone: number;
}

export interface AuthContextType {
  currentUser: User &
    UserData &
    UserIdentification &
    UserQuestionnaireOnboarding;
  accessToken: string;
  userLoggedIn: boolean;
  loading: boolean;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
