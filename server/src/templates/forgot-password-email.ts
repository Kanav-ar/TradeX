import type { EmailTemplateProps } from "../types/emailTemplateTypes";

export const forgotPasswordEmailTemplate = ({
  username,
  verificationUrl,
}: EmailTemplateProps) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset password</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f4f6f8;
          font-family: Arial, Helvetica, sans-serif;
        "
      >

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="background-color: #f4f6f8; padding: 40px 20px;"
        >
          <tr>
            <td align="center">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 600px;
                  background-color: #ffffff;
                  border-radius: 12px;
                "
              >

                <!-- Header -->
                <tr>
                  <td
                    style="
                      padding: 30px;
                      text-align: center;
                      border-bottom: 1px solid #eeeeee;
                    "
                  >
                    <h1
                      style="
                        margin: 0;
                        font-size: 28px;
                        color: #222222;
                      "
                    >
                       Trade<span style="color:#3B82F6">X</span>
                    </h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 35px;">

                    <h2
                      style="
                        margin-top: 0;
                        color: #222222;
                        font-size: 24px;
                      "
                    >
                      Reset your password
                    </h2>

                    <p
                      style="
                        color: #555555;
                        font-size: 16px;
                        line-height: 1.6;
                      "
                    >
                      Hi <b>${username}</b>,
                    </p>

                    <p
                      style="
                        color: #555555;
                        font-size: 16px;
                        line-height: 1.6;
                      "
                    >
                      Forgot password no issues
                      Thanks for creating your TradeApp account.
                      Please verify your email address to complete
                      your registration.
                    </p>

                    <!-- Button -->
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="margin: 30px auto;"
                    >
                      <tr>
                        <td
                          style="
                            border-radius: 8px;
                            background-color: #387ed1;
                          "
                        >
                          <a
                            href="${verificationUrl}"
                            style="
                              display: inline-block;
                              padding: 14px 28px;
                              color: #ffffff;
                              text-decoration: none;
                              font-size: 16px;
                              font-weight: bold;
                            "
                          >
                            Reset password
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p
                      style="
                        color: #777777;
                        font-size: 14px;
                        line-height: 1.6;
                      "
                    >
                      This link will expire in
                      10 minutes.
                    </p>

                    <p
                      style="
                        color: #777777;
                        font-size: 14px;
                        line-height: 1.6;
                      "
                    >
                      If you didn't requested,
                      you can safely ignore this email.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td
                    style="
                      padding: 25px 35px;
                      text-align: center;
                      background-color: #fafafa;
                      border-radius: 0 0 12px 12px;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        color: #999999;
                        font-size: 13px;
                      "
                    >
                      © 2026 TradeX. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
  `;
};