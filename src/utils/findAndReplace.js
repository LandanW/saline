export default function replaceTextInQuill(quill, searchStr, replaceStr) {
  // Get the content of the Quill editor
  let delta = quill.getContents();

  // Loop through each operation in the delta
  delta.ops.forEach((op) => {
      if (typeof op.insert === 'string') {
          // Replace the search string with the replacement string
          op.insert = op.insert.replace(new RegExp(searchStr, 'g'), replaceStr);
      }
  });

  // Clear the Quill editor
  quill.setContents([]);

  // Insert the updated delta back into the Quill editor
  quill.updateContents(delta);
}
