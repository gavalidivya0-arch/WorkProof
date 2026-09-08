import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const FROM_EMAIL = process.env.EMAIL_FROM || "WorkProof <notifications@workproof.com>";

const baseEmailTemplate = (title: string, content: string, actionUrl?: string, actionText?: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #047857; /* Emerald 700 */
      padding: 24px 32px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 32px;
      color: #334155; /* Slate 700 */
      line-height: 1.6;
    }
    .content h2 {
      color: #0f172a;
      font-size: 20px;
      margin-top: 0;
    }
    .button-container {
      margin: 32px 0;
      text-align: center;
    }
    .button {
      background-color: #059669; /* Emerald 600 */
      color: #ffffff !important;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      display: inline-block;
    }
    .footer {
      background-color: #f8fafc;
      padding: 24px;
      text-align: center;
      color: #64748b;
      font-size: 14px;
      border-top: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>WORKPROOF</h1>
    </div>
    <div class="content">
      ${content}
      ${actionUrl && actionText ? `
        <div class="button-container">
          <a href="${actionUrl}" class="button">${actionText}</a>
        </div>
      ` : ''}
    </div>
    <div class="footer">
      <p>This is an automated message from WorkProof. Please do not reply directly to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export async function sendVerificationRequestEmail(
  clientEmail: string,
  freelancerName: string,
  projectName: string,
  role: string,
  duration: string,
  deliverablesCount: number,
  token: string
) {
  const content = `
    <h2>Verification Request</h2>
    <p><strong>${freelancerName}</strong> has requested your verification for their work on <strong>${projectName}</strong>.</p>
    <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
      <p style="margin: 0 0 8px 0;"><strong>Role:</strong> ${role}</p>
      <p style="margin: 0 0 8px 0;"><strong>Duration:</strong> ${duration}</p>
      <p style="margin: 0;"><strong>Deliverables:</strong> ${deliverablesCount} documented items</p>
    </div>
    <p>As the client, verifying this project helps the freelancer build their Trust Score and professional reputation. It only takes a minute.</p>
  `;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: clientEmail,
    subject: `Verification Request from ${freelancerName}`,
    html: baseEmailTemplate(
      "Verification Request",
      content,
      `${APP_URL}/verify-request?token=${token}`,
      "Review Verification"
    ),
  });
}

export async function sendVerificationApprovedEmail(
  freelancerEmail: string,
  projectName: string,
  verificationId: string
) {
  const content = `
    <h2>Project Verified! 🎉</h2>
    <p>Great news! Your client has successfully verified your work on <strong>${projectName}</strong>.</p>
    <p>Your verified experience and Trust Score have been updated. You can now share this project publicly with its permanent verification certificate.</p>
  `;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: freelancerEmail,
    subject: `✅ Project Verified: ${projectName}`,
    html: baseEmailTemplate(
      "Project Verified",
      content,
      `${APP_URL}/verify/${verificationId}`,
      "View Certificate"
    ),
  });
}

export async function sendVerificationRejectedEmail(
  freelancerEmail: string,
  projectName: string,
  reason?: string
) {
  const content = `
    <h2>Verification Status Update</h2>
    <p>Your verification request for <strong>${projectName}</strong> was unfortunately not approved by the client.</p>
    ${reason ? `<div style="background-color: #fef2f2; color: #991b1b; padding: 16px; border-radius: 6px; margin: 20px 0;"><strong>Client Note:</strong> ${reason}</div>` : ''}
    <p>You can update the project details and submit a new request if there was a misunderstanding.</p>
  `;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: freelancerEmail,
    subject: `Verification Update: ${projectName}`,
    html: baseEmailTemplate(
      "Verification Update",
      content,
      `${APP_URL}/dashboard/projects`,
      "View Projects"
    ),
  });
}

export async function sendReviewRequestEmail(
  clientEmail: string,
  freelancerName: string,
  projectName: string,
  projectId: string
) {
  const content = `
    <h2>Review Request</h2>
    <p>Thank you for verifying <strong>${projectName}</strong> for <strong>${freelancerName}</strong>!</p>
    <p>Would you mind taking a quick moment to leave a review? Your feedback significantly impacts their Trust Score and helps them secure future opportunities.</p>
  `;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: clientEmail,
    subject: `Rate your experience with ${freelancerName}`,
    html: baseEmailTemplate(
      "Review Request",
      content,
      `${APP_URL}/reviews/new/${projectId}`,
      "Leave a Review"
    ),
  });
}

export async function sendSecurityAlertEmail(
  email: string,
  title: string,
  message: string
) {
  const content = `
    <h2>Security Alert</h2>
    <p>${message}</p>
    <p>If you did not authorize this action, please secure your account immediately.</p>
  `;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Security Alert: ${title}`,
    html: baseEmailTemplate("Security Alert", content),
  });
}
