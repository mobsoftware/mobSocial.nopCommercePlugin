Quick Source Code Setup:
1. Add the mobSocial plugin and Mob.Core projects to your solution using git repository on CodePlex.
2. Reinstall packages using the nuget update-package command (e.g. "Update-Package -project Nop.Plugin.Widgets.MobSocial -reinstall" )
3. If references are missing to nopCommerce projects then add them to the mobSocial references.
4. Change the mobSocial plugin's Build > Output Path within the project properties to the nopCommerce solution's "Presentation\Nop.Web\Plugins\Widgets.mobSocial" directory.
5. Copy theme and view folders:
     a. Copy the the mobSocial theme folder to the nopCommerce themes folder and set mobSocial as the active theme within the nopCommerce administration. 
     b. You may also choose to manually merge the mobSocial theme with the theme you have installed.
     c. Copy the "Views/mobSocial/Admin" subfolders into the nopCommerce "Administration/Views" folder.
