using System;
using System.Collections.Generic;
using System.Linq;
using Nop.Core.Caching;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Catalog;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Product service
    /// </summary>
    public class TeamPageService : ITeamPageService
    {
        private IRepository<TeamPage> _teamPageRepository;
        #region Fields

        #endregion

        #region Ctor

        /// <summary>
        /// Ctor
        /// </summary>
        public TeamPageService(IRepository<TeamPage> teamPageRepository)
        {
            _teamPageRepository = teamPageRepository;
        }

        #endregion

        #region Methods

        #endregion


        public void Insert(TeamPage entity)
        {
            _teamPageRepository.Insert(entity);
        }

        public void Delete(TeamPage entity)
        {
            _teamPageRepository.Delete(entity);
        }

        public void Update(TeamPage entity)
        {
            _teamPageRepository.Update(entity);
        }

        public TeamPage GetById(int id)
        {
            return _teamPageRepository.GetById(id);
        }

        public List<TeamPage> GetAll()
        {
            return _teamPageRepository.Table.ToList();
        }

        public List<TeamPage> GetAll(string term, int count)
        {
            var termLowerCase = term.ToLower();
            return _teamPageRepository.Table
                .Where(x => x.Name.ToLower().Contains(termLowerCase))
                .Take(count)
                .ToList();

        }



    }

}

    

