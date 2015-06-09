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
    public class SongService : BaseService<Song, SongPicture>, ISongService
    {
        #region Fields
        private IUrlRecordService _urlRecordService;
        private IWorkContext _workContext;
        private IPictureService _pictureService;
        #endregion

        #region Constructor
        public SongService(ISettingService settingService,
          IWebHelper webHelper,
          ILogger logger,
          IRepository<Song> songRepository,
          IRepository<SongPicture> songPictureRepository,
          IUrlRecordService urlRecordService,
          IWorkContext workContext,
          IPictureService pictureService)
            : base(songRepository, songPictureRepository, workContext, urlRecordService)
        {
            _urlRecordService = urlRecordService;
            _workContext = workContext;
            _pictureService = pictureService;
        }
        #endregion
      

        public override List<Song> GetAll(string term, int count)
        {
            return base.Repository.Table
               .Where(x => x.Name.ToLower().Contains(term.ToLower()))
               .Take(count)
               .ToList();
        }

        public override List<SongPicture> GetAllPictures(int entityId)
        {
            return PictureRepository.Table
               .Where(x => x.SongId == entityId)
               .ToList();
        }

        public override SongPicture GetFirstEntityPicture(int entityId)
        {
            return PictureRepository.Table.FirstOrDefault(x => x.SongId == entityId);
        }

        public override Nop.Core.Domain.Media.Picture GetFirstPicture(int entityId)
        {
            var entityPicture = PictureRepository.Table.FirstOrDefault(x => x.SongId == entityId);
            var picture = (entityPicture != null) ? _pictureService.GetPictureById(entityPicture.PictureId) : null;
            return picture;
        }

        public IList<Song> SearchSongs(string Term, int Count = 15, int Page = 1, bool SearchDescriptions = false, bool SearchArtists = false)
        {
            int totalCount;
            return SearchSongs(Term, out totalCount, Count, Page, SearchDescriptions, SearchArtists);
        }

        public IList<Song> SearchSongs(string Term, out int TotalPages, int Count = 15, int Page = 1, bool SearchDescriptions = false, bool SearchArtists = false)
        {
            var songRows = base.Repository.Table.OrderBy(x => x.Id).AsQueryable();
            var listSongs = new List<Song>();

            listSongs = listSongs.Union(songRows.Where(x => x.Name.Contains(Term)).ToList()).ToList();

            if (SearchDescriptions)
            {
                
                listSongs = listSongs.Union(songRows.Where(x=>x.Description.Contains(Term))).ToList();
            }
            if (SearchArtists)
            {

                //TODO: To be implemented
            }          

            TotalPages = int.Parse(Math.Ceiling((decimal)listSongs.Count() / Count).ToString());

            return listSongs.Skip((Page - 1) * Count).Take(Count).ToList();
        }

        public Song GetSongByRemoteEntityId(string RemoteEntityId)
        {
            return base.Repository.Table.Where(x => RemoteEntityId.Contains(x.RemoteEntityId)).FirstOrDefault();
        }
    }
}
