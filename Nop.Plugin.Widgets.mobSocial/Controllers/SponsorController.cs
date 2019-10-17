using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Controllers
{
    public class SponsorController : MobSocialWidgetBaseController
    {
        #region Fields

        private readonly IWorkContext _workContext;

        #endregion

        #region ctor
        public SponsorController(IWorkContext workContext)
        {
            _workContext = workContext;
        }
        #endregion



        #region Methods
       
        
        public IActionResult SponsorDashboard(int battleId)
        {
            return View("mobSocial/Sponsor/SponsorDashboard");
        }

        [HttpPost]
        [Authorize]
        public IActionResult ProductPrizesFormPopup(int battleId)
        {
            return View("mobSocial/Sponsor/ProductPrizesFormPopup");
        }


        #endregion
    }
}