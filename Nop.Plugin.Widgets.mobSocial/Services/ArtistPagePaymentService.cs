using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class ArtistPagePaymentService: BaseEntityService<ArtistPagePayment>, IArtistPagePaymentService
    {
         private readonly IMobRepository<ArtistPagePayment> _paymentMethodRepository;

        public ArtistPagePaymentService(IMobRepository<ArtistPagePayment> pmRepository)
            : base(pmRepository)
        {
            _paymentMethodRepository = pmRepository;
        }

        public void InsertPaymentMethod(Domain.ArtistPagePayment ArtistPagePayment)
        {
            _paymentMethodRepository.Insert(ArtistPagePayment);
        }

        public void DeletePaymentMethod(Domain.ArtistPagePayment ArtistPagePayment)
        {
            if (ArtistPagePayment != null)
                _paymentMethodRepository.Delete(ArtistPagePayment);
        }

        public void UpdatePaymentMethod(Domain.ArtistPagePayment ArtistPagePayment)
        {
            if (ArtistPagePayment.Id != 0)
                _paymentMethodRepository.Update(ArtistPagePayment);
        }

        public Domain.ArtistPagePayment GetPaymentMethod(int ArtistPageId)
        {
            return _paymentMethodRepository.Table.FirstOrDefault(x => x.ArtistPageId == ArtistPageId);
        }

        public override List<ArtistPagePayment> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new System.NotImplementedException();
        }
    }
}
