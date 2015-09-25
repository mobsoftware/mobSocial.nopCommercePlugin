Quick Source Code Setup:
1. Add the mobSocial plugin and Mob.Core projects to your solution.
2. Reinstall packages using the nuget update-package command (e.g. "Update-Package -project Nop.Plugin.Widgets.MobSocial -reinstall" )
3. If references are missing to nopCommerce projects then add them to the mobSocial references.
4. Change the mobSocial plugin's Build > Output Path within the project properties to the nopCommerce solution's "Presentation\Nop.Web\Plugins\Widgets.mobSocial" directory.
5. Copy theme and view folders:
     a. Copy the the mobSocial theme folder to the nopCommerce themes folder and set mobSocial as the active theme within the nopCommerce administration. 
     b. You may also choose to manually merge the mobSocial theme with the theme you have installed.
     c. Copy the "Views/mobSocial/Admin" subfolders into the nopCommerce "Administration/Views" folder.
     
     
Support
=======

If you make money using this timepicker, please consider 
supporting its development.

<a href="http://www.pledgie.com/campaigns/19125"><img alt="Click here to support bootstrap-timepicker!" src="" border="0" target="_blank"/></a> <a class="FlattrButton" style="display:none;" rev="flattr;button:compact;" href="http://jdewit.github.com/bootstrap-timepicker"></a> <noscript><a href="" target="_blank"> <img src="http://api.flattr.com/button/flattr-badge-large.png" alt="Flattr this" title="Flattr this" border="0" /></a></noscript>
