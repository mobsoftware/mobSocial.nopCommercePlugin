using System.Collections.Generic;
using Mob.Core.Services;
using Nop.Core.Domain.Orders;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Services.Payments;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IVoterPassService : IBaseEntityService<VoterPass>
    {
        Order GetVoterPassOrder(int VoterPassOrderId);

        IList<VoterPass> GetPurchasedVoterPasses(int CustomerId, PassStatus? VotePassStatus);

        int CreateVoterPass(BattleType BattleType, int BattleId, ProcessPaymentResult PaymentResponse, CustomerPaymentMethod PaymentMethod, decimal Amount);

        void MarkVoterPassUsed(int VoterPassOrderId);

        VoterPass GetVoterPassByOrderId(int OrderId);

        IList<Order> GetAllVoterPassOrders(BattleType BattleType, int BattleId, PassStatus? VoterPassStatus);
    }
}