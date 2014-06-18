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
                var dbScript = "DROP TABLE GroupPageMember; " +
                               "DROP TABLE CustomerAlbumPicture; " +
                               "DROP TABLE CustomerAlbum; " +
                               "DROP TABLE CustomerVideoLike; " +
                               "DROP TABLE CustomerVideo; " +
                               "DROP TABLE CustomerVideoAlbum; " +
                               "DROP TABLE GroupPage; " +
                               "DROP TABLE TeamPage; " +
                               "DROP TABLE CustomerSkateMove; " +
                               "DROP TABLE SkateMove; " +
                               "DROP TABLE CustomerFriend;"
                    ;


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
