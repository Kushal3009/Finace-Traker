export const otpEmailTemplate = (otpCode) => {
  return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .email-header {
              text-align: center;
              background-color: #FF5722;
              color: white;
              padding: 20px;
              border-radius: 10px 10px 0 0;
            }
            .email-body {
              margin-top: 20px;
              line-height: 1.6;
              text-align: center;
            }
            .otp-code {
              display: inline-block;
              background-color: #FF5722;
              color: white;
              padding: 10px 20px;
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 5px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .email-footer {
              text-align: center;
              margin-top: 40px;
              font-size: 0.9em;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>OTP Verification</h1>
            </div>
            <div class="email-body">
              <p>Hi,</p>
              <p>Use the OTP below to verify your account:</p>
              <div class="otp-code">${otpCode}</div>
              <p>This OTP is valid for only a few minutes. Do not share it with anyone.</p>
            </div>
            <div class="email-footer">
              <p>Best regards,</p>
              <p>Your Company Name</p>
            </div>
          </div>
        </body>
      </html>
    `;
};
