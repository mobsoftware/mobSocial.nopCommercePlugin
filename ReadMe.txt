Quick Source Code Setup:
1. Add the mobSocial plugin and Mob.Core projects to your solution using git repository on codeplex
2. Install Autoac and AutoFac MVC 4 Integration if not already installed using the nuget package manager
3. If references are missing to nopCommerce projects then add them to the mobSocial references
	a. Reference the Entity Framework from the packages folder of nopCommerce
4. Change the mobSocial plugin's Build > Output Path within the project properties to the nopCommerce solution's "Presentation\Nop.Web\Plugins\Widgets.mobSocial" directory.
5. Copy the mobSocial theme folder to the nopCommerce themes folder and set mobSocial as the active theme within the nopCommerce administration.


