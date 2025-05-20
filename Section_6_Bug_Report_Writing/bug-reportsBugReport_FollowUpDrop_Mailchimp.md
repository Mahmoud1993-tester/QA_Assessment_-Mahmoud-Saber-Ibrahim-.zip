# Bug Report

---

### Title & ID
**ID**: BUG-2025-001  
**Title**: Follow-up email scheduled less than 1 hour after initial send is accepted but never sent

---

## Date Reported
**DATE**: 20/05/2025

### Priority & Severity
- **Priority**: High  
- **Severity**: Critical (Loss of core functionality – follow-up not delivered)

---

### Environment
- **Browser**: Google Chrome v123.0.6312.86  
- **OS**: Windows 10 Pro 64-bit  
- **Mailchimp Version**: Web version (app.mailchimp.com), tested on free trial account

---

### Steps to Reproduce
1. Log into Mailchimp and navigate to the Campaigns dashboard.
2. Create a new Email Campaign (Regular type).
3. Complete all required steps: audience, subject line, content, sender info.
4. Schedule the campaign to send at `10:00 AM`.
5. In the campaign flow, choose to "Send a follow-up email" to non-openers.
6. Set the follow-up to be sent at `10:30 AM` (i.e., 30 minutes after initial send).
7. Finish and schedule the campaign.
8. Wait past the scheduled follow-up time and monitor "Sent" stats.

---

### Expected Result
The follow-up email should be sent at the scheduled time (10:30 AM) to recipients who did not open the original email.

---

### Actual Result
No follow-up email is sent. The dashboard still shows it as "Scheduled" even after the time has passed. No delivery or error is logged.

---

### Logs / Network Trace (Hypothetical)

```json
POST /api/v1/scheduler
Status: 200 OK
Payload: {
  "campaign_id": "abc123",
  "followup_type": "non_openers",
  "followup_time": "2025-05-20T10:30:00Z"
}
Response: {
  "status": "scheduled"
}

GET /api/v1/campaigns/abc123/followup-status
Status: 200 OK
Response: {
  "status": "scheduled",
  "sent": 0,
  "errors": []
}
