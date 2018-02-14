using Swu.Portal.Core.Dependencies;
using Swu.Portal.Service.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Swu.Portal.Service
{
    public interface IEmailSender {
        void Send(Email email);
    }
    public class EmailSender : IEmailSender
    {
        private readonly IConfigurationRepository _configRepository;
        public EmailSender(IConfigurationRepository configRepository)
        {
            this._configRepository = configRepository;
        }
        public void Send(Email email)
        {
            var fromAddress = new MailAddress(email.SenderEmail, email.SenderName);
            var toAddress = new MailAddress(this._configRepository.AdminEmail, "website admin");
            var fromPassword = this._configRepository.AdminPassword;
            string subject = "Message from contract us page";
            string body = email.Message;

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }
    }
}
