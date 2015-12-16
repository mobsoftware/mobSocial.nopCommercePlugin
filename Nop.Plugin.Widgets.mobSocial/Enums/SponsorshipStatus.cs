namespace Nop.Plugin.Widgets.MobSocial.Enums
{

    public enum SponsorshipStatus
    {
        /// <summary>
        /// The sponsor has paid but not yet accepted by the battle host
        /// </summary>
        Pending = 1,
        /// <summary>
        /// Accepted by battle host
        /// </summary>
        Accepted = 2,
        /// <summary>
        /// Rejected by battle host
        /// </summary>
        Rejected = 3,
        /// <summary>
        /// Cancelled by battle host
        /// </summary>
        Cancelled = 4
    }
}