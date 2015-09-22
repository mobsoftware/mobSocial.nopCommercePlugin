using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class SharedSongService: BaseEntityService<SharedSong>, ISharedSongService
    {
        private IMobRepository<Song> _songsRepository;
        public SharedSongService(IMobRepository<Song> songsRepository, IMobRepository<SharedSong> sharedSongsRepository)
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
        

        public override List<SharedSong> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new NotImplementedException();
        }
    }
}
