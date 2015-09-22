using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Logging;
using Nop.Services.Media;
using Nop.Services.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class ArtistPageService: BaseEntityWithPictureService<ArtistPage, ArtistPagePicture>, IArtistPageService
    {
        private IUrlRecordService _urlRecordService;
        private IWorkContext _workContext;
        private IPictureService _pictureService;

        public ArtistPageService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger, 
            IMobRepository<ArtistPage> artistPageRepository,
            IMobRepository<ArtistPagePicture> artistPagePictureRepository,
            IUrlRecordService urlRecordService,
            IWorkContext workContext,
            IPictureService pictureService) : base(artistPageRepository, artistPagePictureRepository,pictureService , workContext, urlRecordService)
        {
            _urlRecordService = urlRecordService;
            _workContext = workContext;
            _pictureService = pictureService;
        }
     
        public ArtistPage GetArtistPageByName(string Name)
        {
            return base.Repository.Table.FirstOrDefault(x => x.Name.ToLower() == Name.ToLower());
        }

        public IList<ArtistPage> GetArtistPagesByPageOwner(int PageOwnerId, string SearchTerm = "", int Count = 15, int Page = 1, bool IncludeOrphan = false)
        {
            int totalCount;
            return GetArtistPagesByPageOwner(PageOwnerId, out totalCount, SearchTerm, Count, Page, IncludeOrphan);
        }

       
        public IList<ArtistPage> SearchArtists(string Term, int Count = 15, int Page = 1, bool SearchDescriptions = false)
        {
            int totalCount;
            return SearchArtists(Term, out totalCount, Count, Page, SearchDescriptions);
        }


        public IList<ArtistPage> GetArtistPagesByPageOwner(int PageOwnerId, out int TotalPages, string SearchTerm = "", int Count = 15, int Page = 1, bool IncludeOrphan = false)
        {
            var artistPageRows = base.Repository.Table;
            if (IncludeOrphan)
            {
                artistPageRows = artistPageRows.Where(x => x.PageOwnerId == PageOwnerId || x.PageOwnerId == 0);
            }
            else
            {
                artistPageRows = artistPageRows.Where(x => x.PageOwnerId == PageOwnerId);

            }
            if (SearchTerm != "")
            {
                artistPageRows = artistPageRows.Where(x=> x.Name.Contains(SearchTerm));
            }
          
            TotalPages = int.Parse(Math.Ceiling((decimal)artistPageRows.Count() / Count).ToString());
            return artistPageRows.OrderByDescending(x => x.Id).Skip(Count * (Page - 1)).Take(Count).ToList();
        }

        public IList<ArtistPage> SearchArtists(string Term, out int TotalPages, int Count = 15, int Page = 1, bool SearchDescriptions = false)
        {
            var artistRows = base.Repository.Table.OrderBy(x => x.Id).AsQueryable();


            if (SearchDescriptions)
            {
                artistRows = artistRows.Where(x => x.Name.Contains(Term) || x.Biography.Contains(Term));
            }
            else
            {
                artistRows = artistRows.Where(x => x.Name.Contains(Term));
            }

            TotalPages = int.Parse(Math.Ceiling((decimal)artistRows.Count() / Count).ToString());

            return artistRows.Skip((Page - 1) * Count).Take(Count).ToList();
        }

        public IList<ArtistPage> GetArtistPagesByRemoteEntityId(string[] RemoteEntityId)
        {
            return base.Repository.Table.Where(x => RemoteEntityId.Contains(x.RemoteEntityId)).ToList();
        }

        public override List<ArtistPage> GetAll(string Term, int Count = 15, int Page = 1)
        {
            int totalPages;
            return SearchArtists(Term, out totalPages, Count, Page).ToList();
        }
    }
}
