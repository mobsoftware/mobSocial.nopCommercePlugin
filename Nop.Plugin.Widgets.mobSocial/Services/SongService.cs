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
    public class SongService : BaseEntityWithPictureService<Song, SongPicture>, ISongService
    {
        #region Fields
        private IUrlRecordService _urlRecordService;
        private IWorkContext _workContext;
        private IPictureService _pictureService;
        private IMobRepository<ArtistPage> _artistPageRepository;
        #endregion

        #region Constructor
        public SongService(ISettingService settingService,
          IWebHelper webHelper,
          ILogger logger,
          IMobRepository<Song> songRepository,
          IMobRepository<SongPicture> songPictureRepository,
          IMobRepository<ArtistPage> artistPageRepository,
          IUrlRecordService urlRecordService,
          IWorkContext workContext,
          IPictureService pictureService)
            : base(songRepository, songPictureRepository, pictureService, workContext, urlRecordService)
        {
            _urlRecordService = urlRecordService;
            _workContext = workContext;
            _pictureService = pictureService;
            _artistPageRepository = artistPageRepository;
        }
        #endregion
      

        public IList<Song> SearchSongs(string Term, int Count = 15, int Page = 1, bool SearchDescriptions = false, bool SearchArtists = false, string ArtistName = "", bool PublishedOnly = true)
        {
            int totalCount;
            return SearchSongs(Term, out totalCount, Count, Page, SearchDescriptions, SearchArtists, ArtistName, PublishedOnly);
        }

        public IList<Song> SearchSongs(string Term, out int TotalPages, int Count = 15, int Page = 1, bool SearchDescriptions = false, bool SearchArtists = false, string ArtistName = "", bool PublishedOnly = true)
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

               //we first get all the remote artist ids which contain our artist name in their artist name column
               var remoteArtistIds = _artistPageRepository.Table.Where(x => x.Name.Contains(ArtistName)).Select(x => x.RemoteEntityId);

              //now filter those rows which belong to these artists only
               listSongs = listSongs.Where(x => remoteArtistIds.Contains(x.RemoteArtistId)).ToList();
            }          

            if (PublishedOnly)
                listSongs = listSongs.Where(x => x.Published == true).ToList();

            TotalPages = int.Parse(Math.Ceiling((decimal)listSongs.Count() / Count).ToString());

            return listSongs.Skip((Page - 1) * Count).Take(Count).ToList();
        }

        public Song GetSongByRemoteEntityId(string RemoteEntityId)
        {
            return base.Repository.Table.FirstOrDefault(x => RemoteEntityId.Contains(x.RemoteEntityId));
        }




        public Song GetSongByProductId(int ProductId)
        {
            return base.Repository.Table.FirstOrDefault(x => x.AssociatedProductId == ProductId);
        }

        public override List<Song> GetAll(string Term, int Count = 15, int Page = 1)
        {
            return SearchSongs(Term, Count, Page).ToList();
        }
    }
}
