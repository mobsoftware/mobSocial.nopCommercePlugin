using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IArtistPagePaymentService : IBaseEntityService<ArtistPagePayment>
    {
        void InsertPaymentMethod(ArtistPagePayment ArtistPagePayment);

        void DeletePaymentMethod(ArtistPagePayment ArtistPagePayment);

        void UpdatePaymentMethod(ArtistPagePayment ArtistPagePayment);

        ArtistPagePayment GetPaymentMethod(int ArtistPageId);
    }
}
