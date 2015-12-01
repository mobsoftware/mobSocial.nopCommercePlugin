using System;
using System.Data.Entity;

using System.Data.Entity.Infrastructure;
using System.Linq;
using Mob.Core;
using Mob.Core.Data;
using Mob.Core.Domain;
using Nop.Core;
using Nop.Core.Data;
using Nop.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class MobSocialObjectContext : MobDbContext
    {
        
        public MobSocialObjectContext(string nameOrConnectionString) : base(nameOrConnectionString)
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            var typesToRegister = typeof(MobSocialObjectContext).Assembly.GetTypes()
           .Where(type => !string.IsNullOrEmpty(type.Namespace))
           .Where(type => type.BaseType != null && type.BaseType.IsGenericType &&
               type.BaseType.GetGenericTypeDefinition() == typeof(BaseMobEntityTypeConfiguration<>));
            foreach (var type in typesToRegister)
            {
                dynamic configurationInstance = Activator.CreateInstance(type);
                modelBuilder.Configurations.Add(configurationInstance);
            }

            base.OnModelCreating(modelBuilder);

        }
        
        public override void Install()
        {
            //It's required to set initializer to null (for SQL Server Compact).
            //otherwise, you'll get something like "The model backing the 'your context name' context has changed since the database was created. Consider using Code First Migrations to update the database"
          
            Database.SetInitializer<MobSocialObjectContext>(null);

            base.Install();
        }

        public override void Uninstall()
        {
            try
            {
                // uninstall regardless of errors
                //TODO: Use reflection to delete the entity tables

                // Remove Url Records
                var dbScript = "DELETE FROM UrlRecord WHERE EntityName = 'Customer' OR EntityName = 'EventPage' OR EntityName = 'ArtistPage' OR EntityName = 'Song' OR EntityName = 'VideoBattle'; ";
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

                this.DropTable<WatchedVideo>();
                this.DropTable<ArtistPagePicture>();
                this.DropTable<ArtistPageManager>();
                this.DropTable<ArtistPagePayment>();
                this.DropTable<SharedSong>();   
                this.DropTable<SongPicture>();
                this.DropTable<Song>();
                this.DropTable<ArtistPage>();

                this.DropTable<CustomerPaymentMethod>();
                this.DropTable<VoterPass>();

                this.DropTable<VideoBattleGenre>();
                this.DropTable<VideoGenre>();
                this.DropTable<VideoBattleParticipant>();
                this.DropTable<VideoBattleVote>();
                this.DropTable<VideoBattleVideo>();
                this.DropTable<VideoBattlePicture>();
                this.DropTable<VideoBattlePrize>();

                this.DropTable<VideoBattle>();
                

                
                SaveChanges();
            }
            catch (Exception)
            {
                // ignored
            }

            base.Uninstall();
            

        }

        
    }

}








