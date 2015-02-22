using System;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text.RegularExpressions;

namespace Mob.Core
{
    public static class ObjectContextExtensions
    {
        public static string GetTableName<T>(this DbContext context) where T : class
        {
            ObjectContext objectContext = ((IObjectContextAdapter)context).ObjectContext;

            return objectContext.GetTableName<T>();
        }

        public static string GetTableName<T>(this ObjectContext context) where T : class
        {
            string sql = context.CreateObjectSet<T>().ToTraceString();
            Regex regex = new Regex("FROM (?<table>.*) AS");
            Match match = regex.Match(sql);

            string table = match.Groups["table"].Value;
            return table;
        }


        /// <summary>
        /// Drops a table from the database specified in the context.
        /// </summary>
        /// <typeparam name="T">Entity class with table name</typeparam>
        /// <param name="context">Context to drop table from</param>
        /// <returns></returns>
        public static void DropTable<T>(this DbContext context) where T : class
        {
        
            if (context == null)
                throw new ArgumentNullException("context");

            var tableName = GetTableName<T>(context);

            if (String.IsNullOrEmpty(tableName))
                throw new ArgumentNullException("tableName");

            //drop the table
            if (context.Database.SqlQuery<int>("SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = {0}", tableName).Any<int>())
            {
                var dbScript = "DROP TABLE [" + tableName + "]";
                context.Database.ExecuteSqlCommand(dbScript);
            }
            context.SaveChanges();
        }

    }
}
