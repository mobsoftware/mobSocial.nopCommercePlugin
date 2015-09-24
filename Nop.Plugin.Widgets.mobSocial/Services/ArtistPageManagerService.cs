using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class ArtistPageManagerService: BaseEntityService<ArtistPageManager>, IArtistPageManagerService
    {
        private readonly IMobRepository<ArtistPageManager> _managerRepository;
        private readonly IMobRepository<ArtistPage> _pageRepository;

        public ArtistPageManagerService(IMobRepository<ArtistPageManager> managerRepository,
            IMobRepository<ArtistPage> pageRepository)
            : base(managerRepository)
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


        public override List<ArtistPageManager> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new System.NotImplementedException();
        }
    }
}
