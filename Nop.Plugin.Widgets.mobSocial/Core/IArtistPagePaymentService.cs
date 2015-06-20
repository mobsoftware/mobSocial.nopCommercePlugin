using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public interface IArtistPagePaymentService
    {
        void InsertPaymentMethod(ArtistPagePayment ArtistPagePayment);

        void DeletePaymentMethod(ArtistPagePayment ArtistPagePayment);

        void UpdatePaymentMethod(ArtistPagePayment ArtistPagePayment);

        ArtistPagePayment GetPaymentMethod(int ArtistPageId);
    }
}
