# Web application deployment

## Deployment Step
 * In the Swu.Protal.Web project, you can see the tsconfig.json. It's typescript configuration file. We used this file for compile the typescript into javascript and bundle it into 1 file. So what? In the development step, we need to build the project for let compiler compile the typescript file but in the deployment step, we don't it anymore. We must disable this feature by coppy the config from "additional config for deployment.txt" and replace it to tscofnig.json. If you don't do that, the error will occure. 
 * Then right click at the Swu.Portal.Web project. Choose "Publish". The publishing diablog will show up. You can change the publishing path to locate the folder which is the folder for store the deployment package.

![Publish 1:](https://github.com/chansak/swu/blob/master/document/publish.png)

![Publish 2:](https://github.com/chansak/swu/blob/master/document/publish%202.png)
 
 * Use the deployment package folder for deploy on any web server you want.
