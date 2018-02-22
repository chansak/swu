# Web application Installation

## Host on
 * Web application server : .Net Framework 4.0  and IIS 8
 * Database server : MS SQL Server 2008 S2
 
 ## Dev tool
  * Microsoft Visual Studio 2015 Version 14.0.25431.01 Update 3
    * ASP.NET and Web Tools 2015.1
    * ASP.NET Web Frameworks and Tools
    * GitHub.VisualStudio
    * NuGet Package Manager
    * SQL Server Data Tools
    * TypeScript   1.8.36.0

 
 ## Preparing machine before working
First clone the source from github and initialize database.

```bash
git clone https://github.com/chansak/swu.git
```
![Step 1:](https://github.com/chansak/swu/blob/master/document/1-%20folder%20structure.png)

Then open the Swu.Portal.Web.sln with Visual Studio 2015
![Step 2:](https://github.com/chansak/swu/blob/master/document/2-%20first%20look%20in%20vs2015.png)

There are 5 projects inside:
 * Swu.Protal.Core : contain the main dependencies
 * Swu.Protal.Data : It's data layer, entity model, entity context, repository, domain extension and migration mechanism
 * Swu.Protal.Service : It's service layer
 * Swu.Protal.Web : Presentation layer
 * Swu.Protal.Web.Api : It's api service

Right now, you might want to see the web protal but before that you must create the database by run the command bellow in the Package Manager Console,
```bash
update-database -verbose -force
```
![Step 3:](https://github.com/chansak/swu/blob/master/document/4-%20database%20initialize.png)

Select Swu.Protal.Web as the start up project then press F5 for start debugging mode. Then see the result 
![Step 4:](https://github.com/chansak/swu/blob/master/document/3-%20web%20main%20page.png)
