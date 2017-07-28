using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Swu.Portal.Web
{
    public class CamelJsonResult : JsonResult
    {
        public IList<string> ErrorMessages { get; private set; }

        public CamelJsonResult()
        {
            ErrorMessages = new List<string>();
        }

        public void AddError(string errorMessage)
        {
            ErrorMessages.Add(errorMessage);
        }

        public override void ExecuteResult(ControllerContext context)
        {
            EnsureContextResponse(context);
            SerializeData(context.HttpContext.Response);
        }

        protected virtual void SerializeData(HttpResponseBase response)
        {
            if (ErrorMessages.Any())
            {
                Data = new
                       {
                           ErrorMessage = string.Join("\n", ErrorMessages),
                           ErrorMessages = ErrorMessages.ToArray()
                       };

                response.StatusCode = 400;
            }

            if (Data == null) return;

            response.Write(Data.ToJson());
        }

        private void EnsureContextResponse(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }

            if (JsonRequestBehavior == JsonRequestBehavior.DenyGet &&
                "GET".Equals(context.HttpContext.Request.HttpMethod, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("GET access is not allowed.  Change the JsonRequestBehavior if you need GET access.");
            }

            var response = context.HttpContext.Response;
            response.ContentType = string.IsNullOrEmpty(ContentType) ? "application/json" : ContentType;

            if (ContentEncoding != null)
            {
                response.ContentEncoding = ContentEncoding;
            }
        }
    }

    public class CamelJsonResult<T> : CamelJsonResult
    {
        public new T Data
        {
            get { return (T)base.Data; }
            set { base.Data = value; }
        }
    }
}