using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class ArtistPagePaymentService: IArtistPagePaymentService
    {
         private readonly IRepository<ArtistPagePayment> _paymentMethodRepository;

        public ArtistPagePaymentService(IRepository<ArtistPagePayment> pmRepository)
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
            return _paymentMethodRepository.Table.Where(x => x.ArtistPageId == ArtistPageId).FirstOrDefault();
        }
    }
}
