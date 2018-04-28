The following is the set of instructions to download and run the source code for Give It Forward:


To begin you can either download the source code from the links below or you can unzip the supplied file GIF.zip
	•	https://github.com/GiveItForward/Server
	•	https://github.com/GiveItForward/ClientWithBackbone

What you will need:
1. Java Platform (JDK). Download: http://www.oracle.com/technetwork/java/javase/downloads/index.html
2. Node.JS platform. Download: https://nodejs.org/en/download/
3. The project
	- https://github.com/GiveItForward/Server
	- https://github.com/GiveItForward/ClientWithBackbone
	- We have also included the project as GIF.zip to this submission. 
4. IntelliJ IDE. Download: https://www.jetbrains.com/idea/download
5. Tomcat 8. Download: https://tomcat.apache.org/download-80.cgi
6. The dependencies are handled via Maven. See the list of dependencies in Server/giveitforward/pom.xml and ClientWithBackbone/package.json



Setup Instructions (Server):
1. Open IntelliJ
2. Choose File -> Open
3. In the dialog box, navigate to Server/giveitforward and choose open
4. Choose File -> Project Structure and choose Artifacts from navigation bar on the left
5. Add a new Web Application: Exploded artifact
6. Name it giveitforward and choose your desired output directory
7. Right click on the giveitforward folder listed under Available Elements and select Put Into Output Root
8. Click Ok.
9. Choose Run -> Edit Configurations
10. Add a new tomcat server and choose local
11. Configure the local tomcat server to point to your download version of tomcat 8 (point it at the root directory)
12. Configure the server to point to your JRE (Java Runtime Environment)
13. In the Before Launch window at the bottom, add the artifact you created in steps 4-8
14. Click Ok
15. The server portion of the project is now setup. 



Setup Instructions (Client):
1. Choose File -> Open
2. In the dialog box, navigate to ClientWithBackbone/ and choose open, and then open in a new window.
3. Install the Node.js plugin for IntelliJ
4. Choose Run -> Edit Configurations
3. Add a new Node.js server, name it what ever you want
4. Give it your Node Interpreter location if it’s not already set. It should be something like /usr/local/opt/node@6/bin/node
5. Add the following to Environment Variables:

NODE_ENV=development
USER_ID=supersar-facilitator_api1.comcast.net
PASSWORD=977W5KA3GDXFQQSS
SIGNATURE=A5zG5jYJZJ8MEnJ5wJFm5.L6E4ZsAOkgA5aiUsyxefcKQxXvuXctI.X9
GOOGLE_CLIENT_ID=516734440147-59sb0ckq0i826f0s3bquv96v858v86m3.apps.googleusercontent.com
SERVER_IP=http://localhost:8080

6. Click ok


Run Instructions:
1. Go to the IntelliJ window with the tomcat server and click play
2. Go the the IntelliJ window with the node server and click play
3. Your up and running!
