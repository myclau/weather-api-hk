# tableau-share-report-view
container allow you to share report view and return embed html

# Concept
1. ask tableau server for ticket
2. response html with embed iframe with ticket , so that can share some report to public.

# prerequirement
1. it will need to use Trusted Authentication :
`https://onlinehelp.tableau.com/current/server/en-us/trusted_auth.htm`
2. Add Trusted IP for your host to Tableauserver :
`https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_trustIP.htm`
3. input enviroment variable to docker image


# environment variable

| Env var | Default value | Description |
| --- | --- | --- |
| TABLEAU_HOST | null | must be fill before you use , it is the url to access tableau server |
| USERNAME | null | must be fill before you use , it is the username that have permission to grant ticket or the ticket can read resource only for this user|
| IFRAME_WIDTH | -1 | Width of the iframe to show the report, if both width and height are -1 will auto fullscreen |
| IFRAME_HEIGHT | -1 | Height of the iframe to show the report, if both width and height are -1 will auto fullscreen |
| PORT | 8080 | expose port for access |
# How to reach page

the url will be `<yourservicedomain>/report/<folder>/<item>`

let said my report is `Regional/Economy` and your docker expose with localhost:8080
so the url for the report will be `http://localhost:8080/report/Regional/Economy`


