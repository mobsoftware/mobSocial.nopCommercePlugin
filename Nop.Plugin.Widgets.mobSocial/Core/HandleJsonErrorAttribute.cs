using System.Net;
using System.Web.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class HandleJsonErrorAttribute : HandleErrorAttribute
    {
        public override void OnException(ExceptionContext filterContext)
        {
            var serviceException = filterContext.Exception;

            filterContext.HttpContext.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

            filterContext.Result = new JsonResult
                {
                    Data =
                        new
                            {
                                message =
                                    serviceException == null
                                        ? "There was a problem with that request."
                                        : serviceException.Message
                            }
                };

            filterContext.ExceptionHandled = true;
        }
    }
}