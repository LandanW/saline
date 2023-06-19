export const SHOW_EDIT_DIALOG = 'SHOW_EDIT_DIALOG';
export const MENU_VALUE = 'SET_MENU_VALUE';
export const SELECTED_TEMPLATE = 'SET_SELECTED_TEMPLATE';
export const TEMPLATE_ARRAY = 'SET_TEMPLATE_ARRAY';
export const ENTRIES = 'SET_ENTRIES';
export const DELETED_ENTRIES = 'SET_DELETED_ENTRIES';
export const FILTERED_TEMPLATES = 'SET_FILTERED_TEMPLATES';
export const SELECTED_FILE = 'SELECTED_FILE';
export const QUILL_DELTA = 'QUILL_DELTA';
export const ORIGINAL_QUILL_DELTA = 'ORIGINAL_QUILL_DELTA';
export const TEMPLATE_APPLIED = 'TEMPLATE_APPLIED';

export const showEditDialog = (showEditDialog) => ({
  type: SHOW_EDIT_DIALOG,
  payload: showEditDialog,
});

export const menuValue = (menuValue) => ({
  type: MENU_VALUE,
  payload: menuValue,
});

export const selectedTemplate = (template) => ({
  type: SELECTED_TEMPLATE,
  payload: template,
});

export const templateArray = (templateArray) => ({
  type: TEMPLATE_ARRAY,
  payload: templateArray,
});

export const entries = (entries) => ({
  type: ENTRIES,
  payload: entries,
});

export const deletedEntries = (deletedEntries) => ({
  type: DELETED_ENTRIES,
  payload: deletedEntries,
});

export const filteredTemplates = (filteredTemplates) => ({
  type: FILTERED_TEMPLATES,
  payload: filteredTemplates,
});

export const selectedFile = (selectedFile) => ({
  type: SELECTED_FILE,
  payload: selectedFile,
});

export const quillDelta = (quillData) => ({
  type: QUILL_DELTA,
  payload: quillData,
});

export const originalQuillDelta = (originalQuillDelta) => ({
  type: ORIGINAL_QUILL_DELTA,
  payload: originalQuillDelta,
});

export const templateApplied = (templateApplied) => ({
  type: TEMPLATE_APPLIED,
  payload: templateApplied,
});
