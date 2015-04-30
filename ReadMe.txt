Quick Source Code Setup:
1. Add the mobSocial plugin and Mob.Core projects to your solution using git repository on codeplex.
2. Install Autoac and AutoFac MVC Integration if not already installed using the nuget package manager.
3. If references are missing to nopCommerce projects then add them to the mobSocial references.
4. Install the Entity Framework (same version as nopCommerce) using the nuget package manager.
5. Change the mobSocial plugin's Build > Output Path within the project properties to the nopCommerce solution's "Presentation\Nop.Web\Plugins\Widgets.mobSocial" directory.
6. Copy the mobSocial theme folder to the nopCommerce themes folder and set mobSocial as the active theme within the nopCommerce administration. 
     a. You may also choose to manually merge the mobSocial theme with the theme you have installed.
7. Copy the "Views/mobSocial/Admin" subfolders into the nopCommerce "Administration/Views" folder.



