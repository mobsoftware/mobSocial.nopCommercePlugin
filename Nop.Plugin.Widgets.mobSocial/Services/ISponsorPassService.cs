using System.Collections.Generic;
using Mob.Core.Services;
using Nop.Core.Domain.Orders;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Services.Payments;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface ISponsorPassService : IBaseEntityService<SponsorPass>
    {
        Order GetSponsorPassOrder(int SponsorPassOrderId);

        IList<Order> GetSponsorPassOrders(int SponsorCustomerId, int BattleId, BattleType BattleType);

        IList<SponsorPass> GetPurchasedSponsorPasses(int CustomerId, PassStatus? SponsorPassStatus);

        int CreateSponsorPass(BattleType BattleType, int BattleId, ProcessPaymentResult PaymentResponse, CustomerPaymentMethod PaymentMethod, decimal Amount);

        void MarkSponsorPassUsed(int SponsorPassOrderId, int BattleId, BattleType BattleType);

        SponsorPass GetSponsorPassByOrderId(int OrderId);


    }
}