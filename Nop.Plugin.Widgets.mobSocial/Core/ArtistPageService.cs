using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Logging;
using Nop.Services.Media;
using Nop.Services.Seo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class ArtistPageService: BaseService<ArtistPage, ArtistPagePicture>, IArtistPageService
    {
         private IUrlRecordService _urlRecordService;
        private IWorkContext _workContext;
        private IPictureService _pictureService;

        public ArtistPageService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger, 
            IRepository<ArtistPage> eventPageRepository,
            IRepository<ArtistPagePicture> eventPagePictureRepository,
            IUrlRecordService urlRecordService,
            IWorkContext workContext,
            IPictureService pictureService) : base(eventPageRepository, eventPagePictureRepository, workContext, urlRecordService)
        {
            _urlRecordService = urlRecordService;
            _workContext = workContext;
            _pictureService = pictureService;
        }

      
        public override List<ArtistPage> GetAll(string term, int count)
        {
            // TODO: Later make a stored procedure.
            return base.Repository.Table
                .Where(x => x.Name.ToLower().Contains(term.ToLower()))
                .Take(count)
                .ToList();

        }

        public ArtistPage GetArtistPageByName(string Name)
        {
            return base.Repository.Table.Where(x => x.Name.ToLower() == Name.ToLower()).FirstOrDefault();
        }

        public IList<ArtistPage> GetArtistPagesByPageOwner(int PageOwnerId, string SearchTerm = "", int Count = 15, int Page = 1)
        {
            int totalCount;
            return GetArtistPagesByPageOwner(PageOwnerId, out totalCount, SearchTerm, Count, Page);
        }

       
        public IList<ArtistPage> SearchArtists(string Term, int Count = 15, int Page = 1, bool SearchDescriptions = false)
        {
            int totalCount;
            return SearchArtists(Term, out totalCount, Count, Page, SearchDescriptions);
        }


        public IList<ArtistPage> GetArtistPagesByPageOwner(int PageOwnerId, out int TotalPages, string SearchTerm = "", int Count = 15, int Page = 1)
        {
            var artistPageRows = base.Repository.Table;
            if (SearchTerm != "")
            {
                artistPageRows = artistPageRows.Where(x => x.PageOwnerId == PageOwnerId && x.Name.Contains(SearchTerm));
            }
            else
            {
                artistPageRows = base.Repository.Table.Where(x => x.PageOwnerId == PageOwnerId);
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


        public override List<ArtistPagePicture> GetAllPictures(int entityId)
        {
            return PictureRepository.Table
               .Where(x => x.ArtistPageId == entityId)
               .ToList();
        }

        public override ArtistPagePicture GetFirstEntityPicture(int entityId)
        {
            return PictureRepository.Table.FirstOrDefault(x => x.ArtistPageId == entityId);
        }

        public override Nop.Core.Domain.Media.Picture GetFirstPicture(int entityId)
        {
            var entityPicture = PictureRepository.Table.FirstOrDefault(x => x.ArtistPageId == entityId);
            var picture = (entityPicture != null) ? _pictureService.GetPictureById(entityPicture.PictureId) : null;
            return picture;
        }

        


    }
}
