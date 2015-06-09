using System;
using System.Data.Entity;

using System.Data.Entity.Infrastructure;
using Mob.Core;
using Nop.Core;
using Nop.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class MobSocialObjectContext : DbContext, IDbContext
    {
        public MobSocialObjectContext(string nameOrConnectionString) : base(nameOrConnectionString)
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Configurations.Add(new EventPageMap());
            modelBuilder.Configurations.Add(new EventPagePictureMap());
            modelBuilder.Configurations.Add(new EventPageHotelMap());
            modelBuilder.Configurations.Add(new EventPageAttendanceMap());


            modelBuilder.Configurations.Add(new BusinessPageMap());
            modelBuilder.Configurations.Add(new BusinessPagePictureMap());
            modelBuilder.Configurations.Add(new BusinessPageCouponMap());


            modelBuilder.Configurations.Add(new GroupPageMap());
            modelBuilder.Configurations.Add(new GroupPageMemberMap());

            modelBuilder.Configurations.Add(new SkateMoveMap());
            modelBuilder.Configurations.Add(new CustomerSkateMoveMap());

            modelBuilder.Configurations.Add(new CustomerFriendMap());

            modelBuilder.Configurations.Add(new TeamPageMap());

            modelBuilder.Configurations.Add(new CustomerAlbumMap());
            modelBuilder.Configurations.Add(new CustomerAlbumPictureMap());


            modelBuilder.Configurations.Add(new CustomerVideoAlbumMap());
            modelBuilder.Configurations.Add(new CustomerVideoMap());
            modelBuilder.Configurations.Add(new CustomerVideoLikeMap());

            modelBuilder.Configurations.Add(new CustomerProfileViewMap());

            modelBuilder.Configurations.Add(new CustomerTimelineMap());

            modelBuilder.Configurations.Add(new PictureTagMap());

            modelBuilder.Configurations.Add(new CustomerProfileMap());

            modelBuilder.Configurations.Add(new NotificationMap());
            
            modelBuilder.Configurations.Add(new CustomerFavoriteSongMap());

            modelBuilder.Configurations.Add(new ArtistPageMap());
            modelBuilder.Configurations.Add(new ArtistPagePictureMap());
            modelBuilder.Configurations.Add(new ArtistPageManagerMap());
            modelBuilder.Configurations.Add(new SongMap());
            modelBuilder.Configurations.Add(new SongPictureMap());
            modelBuilder.Configurations.Add(new SharedSongMap());
            base.OnModelCreating(modelBuilder);
        }

        public string CreateDatabaseInstallationScript()
        {
            return ((IObjectContextAdapter) this).ObjectContext.CreateDatabaseScript();
        }

        public void Install()
        {
            //It's required to set initializer to null (for SQL Server Compact).
            //otherwise, you'll get something like "The model backing the 'your context name' context has changed since the database was created. Consider using Code First Migrations to update the database"
            Database.SetInitializer<MobSocialObjectContext>(null);

            Database.ExecuteSqlCommand(CreateDatabaseInstallationScript());
            SaveChanges();
        }

        public void Uninstall()
        {
            try
            {
                // uninstall regardless of errors

                // Remove Url Records
                var dbScript = "DELETE FROM UrlRecord WHERE EntityName = 'Customer' OR EntityName = 'EventPage' OR EntityName = 'ArtistPage' OR EntityName = 'Song'; ";
                Database.ExecuteSqlCommand(dbScript);

                // DROP Tables
                this.DropTable<EventPageAttendance>();
                this.DropTable<EventPagePicture>();
                this.DropTable<EventPageHotel>();
                this.DropTable<EventPage>();
                this.DropTable<BusinessPageCoupon>();
                this.DropTable<BusinessPagePicture>();
                this.DropTable<BusinessPage>();
                this.DropTable<GroupPageMember>();
                this.DropTable<CustomerFavoriteSong>();
                this.DropTable<CustomerTimeline>();
                //this.DropPluginTable"('CustomerAlbumPictureLike>());
                this.DropTable<CustomerProfile>();
                this.DropTable<CustomerAlbumPicture>();
                this.DropTable<CustomerAlbum>();
                this.DropTable<CustomerVideoLike>();
                this.DropTable<CustomerVideo>();
                this.DropTable<CustomerVideoAlbum>();
                this.DropTable<GroupPage>();
                this.DropTable<TeamPage>();
                this.DropTable<CustomerSkateMove>();
                this.DropTable<SkateMove>();
                this.DropTable<CustomerFriend>();
                this.DropTable<PictureTag>();
                this.DropTable<Notification>();
                this.DropTable<CustomerProfileView>();

                this.DropTable<ArtistPagePicture>();
                this.DropTable<ArtistPageManager>();
                this.DropTable<SharedSong>();
                this.DropTable<ArtistPage>();

                this.DropTable<SongPicture>();
                this.DropTable<Song>();

                SaveChanges();
            }
            catch (Exception)
            {

            }

        }


       

        public string CreateDatabaseScript()
        {
            return ((IObjectContextAdapter)this).ObjectContext.CreateDatabaseScript();
        }

        public new IDbSet<TEntity> Set<TEntity>() where TEntity : BaseEntity
        {
            return base.Set<TEntity>();
        }


        public System.Collections.Generic.IList<TEntity> ExecuteStoredProcedureList<TEntity>(string commandText, params object[] parameters) where TEntity : Nop.Core.BaseEntity, new()
        {
            throw new NotImplementedException();
        }

        public System.Collections.Generic.IEnumerable<TElement> SqlQuery<TElement>(string sql, params object[] parameters)
        {
            throw new NotImplementedException();
        }

        public int ExecuteSqlCommand(string sql, bool doNotEnsureTransaction = false, int? timeout = null, params object[] parameters)
        {
            throw new NotImplementedException();
        }
    }

}








