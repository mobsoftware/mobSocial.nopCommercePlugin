using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public interface IEventPageAttendanceService
    {
       
       List<EventPageAttendance> GetGoing(int start, int count);
       
       List<EventPageAttendance> GetNotGoing(int start, int count);

       List<EventPageAttendance> GetInvited(int start, int count);

       List<EventPageAttendance> GetMaybies(int start, int count);

       List<EventPageAttendance> GetAllAttendances(int eventPageId);

       int GetInvitedCount();


       
    }
}
