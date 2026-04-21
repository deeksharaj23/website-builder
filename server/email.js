import nodemailer from 'nodemailer'

function env(name) {
  return process.env[name] || ''
}

export function isEmailConfigured() {
  return Boolean(env('SMTP_HOST') && env('SMTP_PORT') && env('SMTP_USER') && env('SMTP_PASS') && env('SMTP_FROM'))
}

export async function sendEnterpriseLeadEmail({ to, lead }) {
  if (!isEmailConfigured()) return { ok: false, skipped: true }

  const transporter = nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port: Number(env('SMTP_PORT')),
    secure: Number(env('SMTP_PORT')) === 465,
    auth: {
      user: env('SMTP_USER'),
      pass: env('SMTP_PASS'),
    },
  })

  const subject = `Enterprise lead — ${lead.company || 'Unknown company'}`
  const text = [
    `Name: ${lead.name || '-'}`,
    `Work email: ${lead.workEmail}`,
    `Company: ${lead.company || '-'}`,
    '',
    lead.message || '',
  ].join('\n')

  await transporter.sendMail({
    from: env('SMTP_FROM'),
    to,
    replyTo: lead.workEmail,
    subject,
    text,
  })

  return { ok: true }
}

