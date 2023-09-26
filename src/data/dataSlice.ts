import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ApplicationFormState,
  PersonalInformation,
  Profile,
  QuestionTemplate,
} from '../types/types'; 

const initialState: ApplicationFormState = {
  data: {
    id: '',
    type: 'applicationForm',
    attributes: {
      coverImage: '',
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
  name: 'data',
  initialState,
  reducers: {
    setPersonalInfo: (
      state,
      action: PayloadAction<Partial<ApplicationFormAttributes['personalInformation']>>
    ) => {
      // Update the personalInformation field with the payload data
      state.personalInformation = {
        ...state.personalInformation,
        ...action.payload,
      };
    },
    addPersonalQuestion: (
      state,
      action: PayloadAction<QuestionTemplate>
    ) => {
      // Add a new personal question to the array
      state.personalQuestions.push(action.payload);
    },
    editPersonalQuestion: (
      state,
      action: PayloadAction<QuestionTemplate>
    ) => {
      // Find the question by ID and update it
      const index = state.personalQuestions.findIndex(
        (question) => question.id === action.payload.id
      );
      if (index !== -1) {
        state.personalQuestions[index] = action.payload;
      }
    },
    deletePersonalQuestion: (
      state,
      action: PayloadAction<string>
    ) => {
      // Delete a personal question by ID
      state.personalQuestions = state.personalQuestions.filter(
        (question) => question.id !== action.payload
      );
    },
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
    setCustomisedQuestion: (state, action: PayloadAction<QuestionTemplate[]>) => {
      state.data.attributes.customisedQuestions = action.payload;
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
  setPersonalInfo,
  addPersonalQuestion,
  editPersonalQuestion,
  deletePersonalQuestion
} = dataSlice.actions;

export default dataSlice.reducer;
