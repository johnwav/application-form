// Define your application's state structure
export interface ApplicationState {
  // Define your state properties here
  applicationForm: ApplicationFormState;
}

// Define the state for the application form
export interface ApplicationFormState {
  // Define the structure of your application form state
  data: {
    id: string;
    type: string;
    attributes: ApplicationFormAttributes;
  };
}

// Define the structure of ApplicationFormAttributes
export interface ApplicationFormAttributes {
  coverImage: string;
  personalInformation: PersonalInformation;
  profile: Profile;
  customisedQuestions: QuestionTemplate[];
}

// Define the structure of PersonalInformation
export interface PersonalInformation {
  firstName: PersonalInformationTemplate;
  lastName: PersonalInformationTemplate;
  emailId: PersonalInformationTemplate;
  phoneNumber: PersonalInformationTemplate;
  nationality: PersonalInformationTemplate;
  currentResidence: PersonalInformationTemplate;
  idNumber: PersonalInformationTemplate;
  dateOfBirth: PersonalInformationTemplate;
  gender: PersonalInformationTemplate;
  personalQuestions: QuestionTemplate[];
}

// Define the structure of Profile
export interface Profile {
  education: ProfileTemplate;
  experience: ProfileTemplate;
  resume: ProfileTemplate;
  profileQuestions: QuestionTemplate[];
}

// Define the structure of PersonalInformationTemplate
export interface PersonalInformationTemplate {
  internalUse: boolean;
  show: boolean;
}

// Define the structure of ProfileTemplate
export interface ProfileTemplate {
  mandatory: boolean;
  show: boolean;
}

// Define the structure of QuestionTemplate
export interface QuestionTemplate {
  id: string;
  type: string;
  question: string;
  choices?: string[];
  maxChoice?: number;
  disqualify: boolean;
  other: boolean;
}
