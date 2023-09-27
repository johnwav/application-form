import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonalInformation } from "../types/types";
import {
  ApplicationFormState,
  // PersonalInformation,
  Profile,
  QuestionTemplate,
} from "../types/types";

const initialState: ApplicationFormState = {
  data: {
    id: "",
    type: "applicationForm",
    attributes: {
      coverImage: "",
      personalInformation: {
        firstName: { internalUse: false, show: true },
        lastName: { internalUse: false, show: true },
        emailId: { internalUse: false, show: true },
        phoneNumber: { internalUse: false, show: true },
        nationality: { internalUse: false, show: true },
        currentResidence: { internalUse: false, show: true },
        idNumber: { internalUse: false, show: true },
        dateOfBirth: { internalUse: false, show: true },
        gender: { internalUse: false, show: true },
        personalQuestions: [],
      },
      profile: {
        education: { mandatory: true, show: true },
        experience: { mandatory: true, show: true },
        resume: { mandatory: true, show: true },
        profileQuestions: [],
      },
      customisedQuestions: [],
    },
  },
};

// Create a data slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.data.id = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.data.type = action.payload;
    },
    setCoverImage: (state, action: PayloadAction<string>) => {
      state.data.attributes.coverImage = action.payload;
    },
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.data.attributes.profile = { ...action.payload };
    },
    setCustomisedQuestion: (
      state,
      action: PayloadAction<QuestionTemplate[]>
    ) => {
      state.data.attributes.customisedQuestions = action.payload;
    },
    setPersonalInformation: (
      state,
      action: PayloadAction<PersonalInformation>
    ) => {
      state.data.attributes.personalInformation = action.payload;
    },
    setProfileInformation: (state, action: PayloadAction<Profile>) => {
      state.data.attributes.profile = action.payload;
    },
    setPersonalQuestions: (state, action: PayloadAction<QuestionTemplate>) => {
      state.data.attributes.personalInformation.personalQuestions = [
        ...state.data.attributes.personalInformation.personalQuestions,
        action.payload,
      ];
    },
  },
});

// Export actions and reducer
export const {
  setId,
  setType,
  setCoverImage,
  setProfile,
  setCustomisedQuestion,
  setPersonalInformation,
  setPersonalQuestions,
  setProfileInformation,
} = dataSlice.actions;

export default dataSlice.reducer;
