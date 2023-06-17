import {
  SHOW_EDIT_DIALOG,
  MENU_VALUE,
  SELECTED_TEMPLATE,
  TEMPLATE_ARRAY,
  ENTRIES,
  DELETED_ENTRIES,
  FILTERED_TEMPLATES,
  SELECTED_FILE,
  QUILL_DATA,
  TEMPLATE_APPLIED,
} from './actions';

const initialState = {
  showEditDialog: false,
  menuValue: 'static',
  selectedTemplate: '',
  templateArray: [],
  filteredTemplates: [],
  entries: [],
  deletedEntries: [],
  selectedFile: '',
  quillData: null,
  templateApplied: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_EDIT_DIALOG:
      return {
        ...state,
        showEditDialog: action.payload,
      };
    case MENU_VALUE:
      return {
        ...state,
        menuValue: action.payload,
      };
    case SELECTED_TEMPLATE:
      return {
        ...state,
        selectedTemplate: action.payload,
      };
    case TEMPLATE_ARRAY:
      return {
        ...state,
        templateArray: action.payload,
      };
    case ENTRIES:
      return {
        ...state,
        entries: action.payload,
      };
    case DELETED_ENTRIES:
      return {
        ...state,
        deletedEntries: action.payload,
      };
    case FILTERED_TEMPLATES:
      return {
        ...state,
        filteredTemplates: action.payload,
      };
    case SELECTED_FILE:
      return {
        ...state,
        selectedFile: action.payload,
      };
    case QUILL_DATA:
      return {
        ...state,
        quillData: action.payload,
      };
    case TEMPLATE_APPLIED:
      return {
        ...state,
        templateApplied: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;