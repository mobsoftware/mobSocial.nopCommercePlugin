using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class SharedSongService: BaseService<SharedSong, SharedSong>, ISharedSongService
    {
        private IRepository<Song> _songsRepository;
        public SharedSongService(IRepository<Song> songsRepository, IRepository<SharedSong> sharedSongsRepository)
            : base(sharedSongsRepository)
        {
            _songsRepository = songsRepository;
        }

        public IList<SharedSong> GetSharedSongs(int CustomerId,int Count = 15, int Page = 1)
        {

            int TotalPages;
            return GetSharedSongs(CustomerId, out TotalPages, Count, Page);
        }

        public IList<SharedSong> GetSharedSongs(int CustomerId, out int TotalPages, int Count = 15, int Page = 1)
        {
            var songRows = base.Repository.Table.OrderByDescending(x => x.Id).AsQueryable();
            var listSongShared = songRows.Where(x => x.SenderId == CustomerId);
            TotalPages = int.Parse(Math.Ceiling((decimal)songRows.Count() / Count).ToString());
            return listSongShared.Skip((Page - 1) * Count).Take(Count).ToList();
        }

     

        public IList<SharedSong> GetReceivedSongs(int CustomerId, int Count = 15, int Page = 1)
        {
            int TotalPages;
            return GetReceivedSongs(CustomerId, out TotalPages, Count, Page);
        }

        public IList<SharedSong> GetReceivedSongs(int CustomerId, out int TotalPages, int Count = 15, int Page = 1)
        {
            var songRows = base.Repository.Table.OrderByDescending(x => x.Id).AsQueryable();
            var listSongShared = songRows.Where(x => x.CustomerId == CustomerId);
            TotalPages = int.Parse(Math.Ceiling((decimal)songRows.Count() / Count).ToString());
            return listSongShared.Skip((Page - 1) * Count).Take(Count).ToList();
        }


        public override List<SharedSong> GetAll(string term, int count)
        {
            throw new NotImplementedException();
        }

        public override List<SharedSong> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override SharedSong GetFirstEntityPicture(int entityId)
        {
            throw new NotImplementedException();
        }

        public override Nop.Core.Domain.Media.Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }


       
    }
}
