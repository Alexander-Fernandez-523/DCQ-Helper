function formatYesAndX() {
  var body = DocumentApp.getActiveDocument().getBody();
  
  // Define the variations of "Yes" and "x"
  var variationsYes = [' - yes', ' - Yes', ' - YES', ' -yes', ' -Yes', ' -YES'];
  var variationsX = [' -x', ' -X', ' - x', ' - X'];

  // Function to search and format text
  function searchAndFormat(variations, replacementText) {
    for (var i = 0; i < variations.length; i++) {
      var searchText = variations[i];
      var foundElements = body.findText(searchText);
      
      while (foundElements !== null) {
        var foundText = foundElements.getElement().asText();
        var startOffset = foundElements.getStartOffset();
        var endOffset = foundElements.getEndOffsetInclusive();

        // Replace text with correctly formatted version
        foundText.deleteText(startOffset, endOffset);
        foundText.insertText(startOffset, replacementText);

        // Apply bold and red color formatting
        foundText.setBold(startOffset, startOffset + replacementText.length - 1, true);
        foundText.setForegroundColor(startOffset, startOffset + replacementText.length - 1, '#FF0000');

        foundElements = body.findText(searchText, foundElements);
      }
    }
  }

  // Apply formatting for "Yes" (capitalize "Y") and "X"
  searchAndFormat(variationsYes, "-Yes");
  searchAndFormat(variationsX, "-X");
}
