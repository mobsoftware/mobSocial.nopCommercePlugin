using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Nop.Core;
using Nop.Data;

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
                var dbScript = "DELETE FROM UrlRecord WHERE EntityName = 'Customer' OR EntityName = 'EventPage'; ";

                // DROP Tables
                dbScript = dbScript +
                    "IF OBJECT_ID('EventPageAttendance', 'U') IS NOT NULL DROP TABLE EventPageAttendance; " +
                    "IF OBJECT_ID('EventPagePicture', 'U') IS NOT NULL DROP TABLE EventPagePicture; " +
                    "IF OBJECT_ID('EventPageHotel', 'U') IS NOT NULL DROP TABLE EventPageHotel; " +
                    "IF OBJECT_ID('EventPage', 'U') IS NOT NULL DROP TABLE EventPage; " +
                    "IF OBJECT_ID('GroupPageMember', 'U') IS NOT NULL DROP TABLE GroupPageMember; " +
                    "IF OBJECT_ID('CustomerTimeline', 'U') IS NOT NULL DROP TABLE CustomerTimeline; " +
                    //"IF OBJECT_ID('CustomerAlbumPictureLike', 'U') IS NOT NULL DROP TABLE CustomerAlbumPictureLike; " +
                    "IF OBJECT_ID('CustomerProfile', 'U') IS NOT NULL DROP TABLE CustomerProfile; " +
                    "IF OBJECT_ID('CustomerAlbumPicture', 'U') IS NOT NULL DROP TABLE CustomerAlbumPicture; " +
                    "IF OBJECT_ID('CustomerAlbum', 'U') IS NOT NULL DROP TABLE CustomerAlbum; " +
                    "IF OBJECT_ID('CustomerVideoLike', 'U') IS NOT NULL DROP TABLE CustomerVideoLike; " +
                    "IF OBJECT_ID('CustomerVideo', 'U') IS NOT NULL DROP TABLE CustomerVideo; " +
                    "IF OBJECT_ID('CustomerVideoAlbum', 'U') IS NOT NULL DROP TABLE CustomerVideoAlbum; " +
                    "IF OBJECT_ID('GroupPage', 'U') IS NOT NULL DROP TABLE GroupPage; " +
                    "IF OBJECT_ID('TeamPage', 'U') IS NOT NULL DROP TABLE TeamPage; " +
                    "IF OBJECT_ID('CustomerSkateMove', 'U') IS NOT NULL DROP TABLE CustomerSkateMove; " +
                    "IF OBJECT_ID('SkateMove', 'U') IS NOT NULL DROP TABLE SkateMove; " +
                    "IF OBJECT_ID('CustomerFriend', 'U') IS NOT NULL DROP TABLE CustomerFriend; " +
                    "IF OBJECT_ID('PictureTag', 'U') IS NOT NULL DROP TABLE PictureTag; " +
                    "IF OBJECT_ID('CustomerProfileView', 'U') IS NOT NULL DROP TABLE CustomerProfileView; ";


                Database.ExecuteSqlCommand(dbScript);
                SaveChanges();
            }
            catch (Exception)
            {

            }

        }

        public new IDbSet<TEntity> Set<TEntity>() where TEntity : BaseEntity
        {
            return base.Set<TEntity>();
        }

        public System.Collections.Generic.IList<TEntity> ExecuteStoredProcedureList<TEntity>(string commandText,
                                                                                             params object[] parameters)
            where TEntity : BaseEntity, new()
        {
            throw new System.NotImplementedException();
        }

        public System.Collections.Generic.IEnumerable<TElement> SqlQuery<TElement>(string sql,
                                                                                   params object[] parameters)
        {
            throw new System.NotImplementedException();
        }

        public int ExecuteSqlCommand(string sql, bool ensureTransaction,  int? timeout = null, params object[] parameters)
        {
            throw new System.NotImplementedException();
        }
    }

}
