
Multisite for satellite pages
=============================

Equinor has multiple, public websites, apart from the "global" equinor.com. Today, they are hosted in AEM. The AEM solution will be discontinued and replaced with a solution built with Sanity CMS for content management and editor interface and Next.js as a web application. 

Challenge: create a solution for hosting webpages for the other sites that Equinor has. 

For this case, we see two different solutions: 


Duplication
-------------

In this solution, one would make multiple instances of the same codebase, both for the web application and the Sanity Studio. 
One would make use of environment variables and configurations to have each instance of the application query different datasets at runtime, which would each belong to one website.


Strengths: 

+ Same codebase everywhere. 
+ No need to update code several places during maintenance and further development phase.
+ Exact same functionality in every app and Sanity editor. 
+ Easy to give editors access to specific sites when needed (roles/permissions control). 

Unknowns: 

We do not know for certain what can be included in the current contract we have with Sanity at the moment. This solution would require six more studios, which is an instance of the editor interface, and perhaps double or triple the amount of datasets. 

Some changes in how languages are handled in the both the web application and the Sanity Studio would be required, but most of the code base would remain the same. 

While the global site is using a complex menu structure to fit its needs, the satellite pages will probably need a simpler solution to navigation, which will be a difference between the two solutions. 

The global site has static, archived content, which will be automatically included in the satellite pages as well, with todays code base. We would need a way to hide or not load that type of content for satellites.  

Weaknesses:

+ Need to host studios ourselves. 
+ Harder to share content across datasets if ever needed.

Costs:

Extra datasets: 20 USD per dataset.

The price of several Radix deployments
Deployment costs (8 production studios + 8 production apps) + ? testing environments: Unknown





One solution for global site, one for satellites
-------------------------------------------------

The other solution we have drawn up is to make one studio and one web application for all the satellite pages. 
This solution would have one Sanity Studio url for all the different satellite sites. New sites would be created in the Studio interface and added as a configuration to the web application. All the pages would also share web application. The application would listen for the url the user is coming from, and serve content based on that. Said web application would also, if needed, have the same functionality and components as the "global" page equinor.com .

Strengths: 

+ One interface and one login/url for all satellites. 
+ Possibly cheaper dataplan, if first solution makes the the contract with Sanity more expensive. 

Weaknesses: 

+ While quite similar, this will add another codebase to maintain and build, as for both the Sanity part and the web application.

Unknowns:

+ It is uncertain how simple it would be to have this application share components with the global site. 
+ Access control for different satellites in Studio. 
