using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class ArtistPageManagerService:IArtistPageManagerService
    {
        private readonly IRepository<ArtistPageManager> _managerRepository;
        private readonly IRepository<ArtistPage> _pageRepository;

        public ArtistPageManagerService(IRepository<ArtistPageManager> managerRepository, IRepository<ArtistPage> pageRepository)
        {
            _managerRepository = managerRepository;
            _pageRepository = pageRepository;
        }
        public void AddPageManager(ArtistPageManager Manager)
        {
            _managerRepository.Insert(Manager);
        }

        public void DeletePageManager(ArtistPageManager Manager)
        {
            _managerRepository.Delete(Manager);
        }

        public void DeletePageManager(int ArtistPageId, int CustomerId)
        {
            _managerRepository.Delete(_managerRepository.Table.Where(x => x.ArtistPageId == ArtistPageId && x.CustomerId == CustomerId));
        }

        public bool IsPageManager(int ArtistPageId, int CustomerId)
        {
            return _managerRepository.Table.Count(x => x.ArtistPageId == ArtistPageId && x.CustomerId == CustomerId) == 1;
        }

        public IList<ArtistPageManager> GetPageManagers(int ArtistPageId)
        {
            return _managerRepository.Table.Where(x => x.ArtistPageId == ArtistPageId).ToList();
        }

        public IList<ArtistPage> GetPagesAsManager(int CustomerId)
        {
            return _managerRepository.Table.Where(x => x.CustomerId == CustomerId).Select( x=> x.ArtistPage).ToList();
        }


       
    }
}
