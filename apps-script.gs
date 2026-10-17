/**
 * Google Apps Script — RSVP collector for Kawthar & Yusuf's wedding site.
 *
 * SETUP:
 * 1. Create a Google Sheet. In row 1, add these headers (exact order):
 *    Timestamp | Full Name | Phone Number | Email | Attending | Message
 * 2. In the Sheet: Extensions -> Apps Script.
 * 3. Delete any starter code, paste this whole file in.
 * 4. Click "Deploy" -> "New deployment" -> type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Deploy, authorize it, and copy the Web App URL it gives you
 *    (ends in /exec).
 * 6. Paste that URL into js/main.js where it says RSVP_ENDPOINT.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.phone || "",
    data.email || "",
    data.attending || "",
    data.message || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
